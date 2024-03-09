/* eslint-disable linebreak-style */
import { Link } from 'react-router-dom';

const buttonClass =
  'font-semibold py-2 px-4 bg-gradient-to-r from-rose-800 to-rose-900 text-gray-100 rounded-lg shadow-md hover:from-gray-50 hover:to-gray-300 hover:text-black transition-all ease-linear focus:outline-none disabled:opacity-40 disabled:pointer-events-none';

export const Button = ({ text, to, submit = false, ...rest }) =>
  to ? (
    <Link to={to} className={buttonClass} tabIndex="-1" {...rest}>
      {text}
    </Link>
  ) : (
    <button type={submit ? 'submit' : 'button'} className={buttonClass} tabIndex="-1" {...rest}>
      {text}
    </button>
  );
