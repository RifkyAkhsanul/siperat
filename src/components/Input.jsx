export const Input = ({ label, ...rest }) => (
  <div>
    <label className="block font-semibold text-rose-900 text-md mb-2">{label}</label>
    <input
      className="shadow bg-white appearance-none border border-gray-200 rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg disabled:opacity-50"
      {...rest}
    />
  </div>
);
