import { useEffect, useState } from 'react';
import { Button, SiperatLogo, CheckUser, setUserData, getToken, setUserPrivilege } from '../components';
import axios from 'axios';

const Login = () => {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('🔐 Use SIAM account');

  useEffect(() => {
    if (!loading) return;

    // Check nim & pass
    if (nim.length !== 15 || password.length < 8) {
      setMessage('❌  Format invalid');
      setLoading(false);
      return;
    }

    // Check filkom
    if (nim.substring(2, 6) !== '5150') {
      setMessage('🙏  Only for FILKOM students');
      setLoading(false);
      return;
    }

    setMessage('⏳ Authenticating...');

    fetch('https://bemfilkom-rest.vercel.app/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nim,
        password,
      }),
    })
      .then((reply) => {
        return reply.json();
      })
      .then((reply) => {
        if (reply.success) {
          setUserData(reply.data, reply.token);
          axios({
            method: 'GET',
            url: 'https://bemfilkom.ddns.net/is_admin',
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
            params: {
              bearer: reply.token,
            },
          })
            .then(() => {
              setUserPrivilege('1');
            })
            .catch(() => {
              setUserPrivilege('0');
            })
            .finally(() => {
              setMessage('⏳  Redirecting...');
              setLoading(false);
              window.location.reload();
            });
        } else {
          setLoading(false);
          setMessage('❌  Credentials incorrect');
        }
      })
      .catch((err) => {
        setMessage('❌  Error occurred');
        setLoading(false);
      });
  }, [loading]);

  return (
    <>
      <CheckUser forLoggedOut redirect />

      <section className="relative flex flex-col content-center justify-center flex-grow h-screen min-h-full overflow-y-hidden bg-gray-100 pattern-circuitry">
        <header className="relative z-10 flex flex-col content-center justify-center flex-grow h-full min-h-screen p-16 space-x-0 md:space-x-16 md:flex-row md:justify-center">
          <div className="flex flex-col content-center justify-center">
            <img
              src="https://res.cloudinary.com/dnyrrcacd/image/upload/v1707911498/OPREC%202024/LogoNoText_ei3ill.png"
              className="hidden md:block self-center w-48 md:ml-6"
            />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
            }}
            className="self-center text-center md:text-left w-full max-w-sm text-gray-900 font-bold"
          >
            <div className="mb-4">
              <label className="block text-md mb-2">NIM 💳</label>
              <input
                className="shadow appearance-none border rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg"
                name="nim"
                type="text"
                required
                autoFocus
                pattern="[0-9]{15}"
                placeholder="NIM"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-md mb-2">Password 🗝</label>
              <input
                autoComplete="on"
                className="shadow appearance-none border rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg"
                name="password"
                type="password"
                pattern=".{6,}"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-4 md:space-y-0 pt-4 md:pt-2 md:flex-row items-center justify-between">
              <span className={`${loading && 'animate-pulse'} text-sm text-gray-700 font-normal`}>{message}</span>
              <Button disabled={loading} submit text="Login →" />
            </div>
          </form>
        </header>
      </section>
    </>
  );
};

export default Login;
