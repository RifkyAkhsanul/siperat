import { Link } from 'react-router-dom';
import { SiperatLogo } from '../components';

const Home = () => {
  return (
    <>
      <header className="relative flex flex-col mt-16 content-center justify-center flex-grow min-h-full overflow-hidden bg-rose-100 pattern-leafy">
        <div className="relative flex flex-col content-center justify-center flex-grow">
          <div className="relative z-10 flex flex-col content-center justify-center flex-grow py-20 space-x-0 md:space-x-16 md:flex-row md:justify-center">
            <SiperatLogo className="self-center w-48" />
            <div className="self-center text-center md:text-left text-shadow-md">
              <h1 className="text-5xl font-extrabold leading-tight tracking-tighter mb-2 md:text-7xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-900 to-rose-500">SIPERAT</span>
              </h1>
              <h2 className="text-2xl font-semibold leading-tight tracking-tighter md:mb-0 md:text-2xl text-rose-700">Sistem Informasi Persuratan</h2>
              <h2 className="text-2xl font-semibold leading-tight tracking-tighter md:mb-0 md:text-2xl text-rose-700">BEM FILKOM UB</h2>
            </div>
          </div>
        </div>
      </header>
      <section id="menu" className="relative flex flex-col flex-grow px-12 py-28 bg-red-900 pattern-woody">
        <div className="self-center flex content-center justify-center w-full mb-12">
          <h2 className="text-4xl text-center font-semibold leading-tight tracking-tighter md:mb-0 text-white">Layanan SIPERAT</h2>
        </div>
        <div className="self-center grid grid-cols-1 gap-8 sm:grid-cols-3 w-full max-w-4xl">
          <div className="flex flex-col content-center justify-start space-y-6 tracking-tight leading-relaxed text-gray-100">
            <Link
              to="/buku-tamu"
              className="text-center py-3 px-4 text-xl font-bold bg-gradient-to-r from-gray-50 to-gray-300 text-gray-800 rounded-lg shadow-md transition ease-linear hover:from-gray-200 focus:outline-none"
              tabIndex="-1"
            >
              📓 Buku Tamu
            </Link>
            <div className="text-lg tracking-tight leading-relaxed text-gray-200">
              Untuk <b>eksternal & internal FILKOM</b> yang mengirim undangan, surat, poster, dsb yang ditujukan kepada BEM FILKOM
            </div>
          </div>

          <div className="flex flex-col content-center justify-start space-y-6 tracking-tight leading-relaxed text-gray-100">
            <Link
              to="/request-ttd"
              className="text-center py-3 px-4 text-xl font-bold bg-gradient-to-r from-gray-50 to-gray-300 text-gray-800 rounded-lg shadow-md transition ease-linear hover:from-gray-200 focus:outline-none"
              tabIndex="-1"
            >
              ✍️ Permintaan TTD
            </Link>
            <div className="text-lg tracking-tight leading-relaxed text-gray-200">
              Untuk <b>internal BEM FILKOM</b> yang membutuhkan penandatanganan surat, sertifikat, atau dokumen lainnya yang membutuhkan persetujuan BEM
            </div>
          </div>

          <div className="flex flex-col content-center justify-start space-y-6 tracking-tight leading-relaxed text-gray-100">
            <Link
              to="/nomor-surat"
              className="text-center py-3 px-4 text-xl font-bold bg-gradient-to-r from-gray-50 to-gray-300 text-gray-800 rounded-lg shadow-md transition ease-linear hover:from-gray-200 focus:outline-none"
              tabIndex="-1"
            >
              🎰 Nomor Surat
            </Link>
            <div className="text-lg tracking-tight leading-relaxed text-gray-200">
              Untuk <b>internal BEM FILKOM</b> yang memerlukan penomoran untuk surat keluar, penerbitan sertifikat, surat keterangan aktif, dll
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
