import { Redirect } from 'react-router';
import jwt_decode from 'jwt-decode';

// LocalStorage entries:
// bem_ZGF0YQ: encrypted user data
// bem_dG9rZW4: user token
// bem_ZXhwaXJl: session expiring timestamp
// bem_cHJpdmlsZWdl: privilege

const invalidateSession = () => localStorage.clear();

const setUserPrivilege = (privilege) => {
  localStorage.setItem('bem_cHJpdmlsZWdl', privilege);
};

const setUserData = (userData, token) => {
  const exp = jwt_decode(token).exp;

  localStorage.setItem('bem_ZGF0YQ', btoa(JSON.stringify(userData)));
  localStorage.setItem('bem_dG9rZW4', token);
  localStorage.setItem('bem_ZXhwaXJl', exp);
};

const getUser = () => {
  if (localStorage.getItem('bem_dG9rZW4') == null) {
    return {};
  } else if (Date.now() > localStorage.getItem('bem_ZXhwaXJl') * 1000) {
    alert('Your session is expired. Please login again.');
    invalidateSession();
    return {};
  } else {
    try {
      let decoded = atob(localStorage.getItem('bem_ZGF0YQ'));
      return JSON.parse(decoded);
    } catch (e) {
      return {};
    }
  }
};

const getUserData = getUser();

const isUserAdmin = localStorage.getItem('bem_cHJpdmlsZWdl') === '1';

const getToken = localStorage.getItem('bem_dG9rZW4');

const CheckUser = ({ forLoggedOut = false, redirect = false, children = null }) => {
  let hasToken = localStorage.getItem('bem_dG9rZW4') && localStorage.getItem('bem_ZGF0YQ') && Date.now() < localStorage.getItem('bem_ZXhwaXJl') * 1000;

  // Only show for logged in user
  if (!forLoggedOut && !hasToken) {
    if (redirect) {
      invalidateSession();
      return <Redirect to="/login" />;
    }
    return null;
  }
  // Only show for logged out user (w/ forLoggedOut=true)
  else if (forLoggedOut && hasToken) {
    if (redirect) return <Redirect to="/dashboard" />;
    return null;
  }
  if (children) return children;
  return null;
};

export { setUserData, setUserPrivilege, getUserData, getToken, isUserAdmin, invalidateSession, CheckUser };
