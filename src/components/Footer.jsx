import { SiperatLogo } from './SiperatLogo';

const Footer = () => {
  return (
    <footer className="relative flex flex-col content-center justify-center flex-grow overflow-y-hidden bg-rose-100 pattern-leafy py-16 px-12 border-t-8 border-rose-200">
      <div className="flex justify-center items-center gap-x-10 p-10">
        <img src="https://res.cloudinary.com/kuhakuni/image/upload/v1676036150/tgb6ngq5vatjp1lwiqqi.png" alt="LOGO BEM" className="sm:max-h-40 max-h-32" />
        <div className="flex content-center flex-col justify-center gap-x-5">
          <SiperatLogo className="self-center sm:max-h-28 max-h-20" />
          <div className="self-center text-center md:text-left text-shadow-md">
            <h1 className="text-xl font-extrabold leading-tight tracking-tighter mb-2 mt-3 md:text-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-900 to-rose-500">SIPERAT</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-600">
        <h1 className="mb-3 text-xl leading-tight tracking-tighter">
          Made with <span className="text-red-500">&hearts;</span> by Biro Pengembangan Informasi & Teknologi
        </h1>
        <p className="tracking-tight">
          <span className="font-semibold">&copy; {new Date().getFullYear()} BEM FILKOM UB</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
