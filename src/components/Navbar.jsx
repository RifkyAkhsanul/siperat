import { Link, NavLink } from 'react-router-dom';
import { CheckUser, getUserData, invalidateSession, isUserAdmin } from './SessionHelper';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Button } from './Button';
import { SiperatLogo } from './SiperatLogo';

const Navbar = () => {
  const [showMenu, setMenu] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="fixed top-0 w-full h-auto z-50 flex flex-col content-center justify-center px-4 md:px-20 bg-red-900 pattern-circuitry"
      style={{
        boxShadow: '0 4px 14px 3px rgb(0 0 0 / 40%)',
      }}
    >
      <div className="self-center flex flex-col md:flex-row content-center justify-between flex-grow w-full">
        <Link
          to="/"
          className="my-3 hidden md:flex self-center md:space-x-2 text-md md:text-2xl font-semibold leading-relaxed tracking-tight text-shadow-md text-center md:text-left"
        >
          <SiperatLogo className="self-center h-6" />
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-white to-red-300">SIPERAT</span>
        </Link>
        <button
          onClick={() => setMenu(!showMenu)}
          className="my-3 md:hidden text-center font-semibold py-1 px-3 bg-gray-900 text-gray-100 rounded-lg shadow-md focus:outline-none"
          tabIndex="-1"
        >
          Menu &darr;
        </button>
        <div
          onClick={() => setMenu(false)}
          className={`${
            showMenu ? 'flex' : 'hidden'
          } mb-3 md:my-3 flex-wrap md:flex flex-row content-center justify-center text-md text-justify text-gray-100 space-x-2 gap-2 md:gap-0`}
        >
          <CheckUser>
            <NavLink
              to="/dashboard"
              className="font-semibold box-border py-2 px-4 rounded-lg transition-all ease-linear focus:outline-none disabled:opacity-40 disabled:pointer-events-none"
              tabIndex="-1"
              activeClassName="bg-gradient-to-r from-gray-50 to-gray-300 text-black"
            >
              📬 Dashboard
            </NavLink>
            {isUserAdmin && (
              <NavLink
                to="/admin"
                className="font-semibold box-border py-2 px-4 rounded-lg transition-all ease-linear focus:outline-none disabled:opacity-40 disabled:pointer-events-none"
                tabIndex="-1"
                activeClassName="bg-gradient-to-r from-gray-50 to-gray-300 text-black"
              >
                👩‍💻 Admin
              </NavLink>
            )}

            {/*<div className="flex flex-row space-x-6">*/}
            {/*<div className="flex self-center font-semibold">{getUserData && getUserData.nama && getUserData.nama.trim().split(/\s+/).shift()}</div>*/}
            <Button
              text="Logout"
              onClick={() => {
                invalidateSession();
                window.location.reload();
              }}
            />
            {/*</div>*/}
          </CheckUser>

          <CheckUser forLoggedOut>
            <Button to="/login" text="Login" />
          </CheckUser>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
