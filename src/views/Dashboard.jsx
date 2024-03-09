import { Link } from 'react-router-dom';

import { CheckUser, PageTitle } from '../components';

const Dashboard = () => {
  return (
    <>
      <CheckUser redirect />
      <PageTitle title="Dashboard" description="Pilih layanan SIPERAT yang Anda butuhkan" icon="📬" />

      <section className="relative flex flex-col flex-grow px-12 py-28 bg-gray-100 pattern-circuitry">
        <div className="self-center grid grid-cols-1 gap-8 sm:grid-cols-3 w-full max-w-4xl">
          <div className="flex flex-col content-center justify-start space-y-6 tracking-tight leading-relaxed text-gray-100">
            <div className="text-2xl font-semibold tracking-tight leading-relaxed text-gray-600">📓 Buku Tamu</div>
            <Link
              to="/buku-tamu"
              className="py-3 px-4 text-xl font-bold bg-gradient-to-r from-rose-800 to-rose-900 text-gray-100 rounded-lg shadow-md transition ease-linear hover:from-gray-50 hover:to-gray-300 hover:text-black focus:outline-none"
              tabIndex="-1"
            >
              Isi Buku Tamu 📝
            </Link>
            <div className="tracking-tight leading-relaxed text-gray-500">
              Untuk <b>eksternal & internal FILKOM</b> yang mengirim undangan, surat, poster, dsb yang ditujukan kepada BEM FILKOM
            </div>
          </div>

          <div className="flex flex-col content-center justify-start space-y-6 tracking-tight leading-relaxed text-gray-100">
            <div className="text-2xl font-semibold tracking-tight leading-relaxed text-gray-600">✍️ Request TTD</div>
            <Link
              to="/request-ttd"
              className="py-3 px-4 text-xl font-bold bg-gradient-to-r from-rose-800 to-rose-900 text-gray-100 rounded-lg shadow-md transition ease-linear hover:from-gray-50 hover:to-gray-300 hover:text-black focus:outline-none"
              tabIndex="-1"
            >
              Request Saya 📨
            </Link>
            <Link
              to="/request-ttd/new"
              className="py-3 px-4 text-xl font-bold bg-gradient-to-r from-rose-800 to-rose-900 text-gray-100 rounded-lg shadow-md transition ease-linear hover:from-gray-50 hover:to-gray-300 hover:text-black focus:outline-none"
              tabIndex="-1"
            >
              Ajukan Request 🙏
            </Link>
            <div className="tracking-tight leading-relaxed text-gray-500">
              Untuk <b>semua KBMFILKOM</b> yang membutuhkan penandatanganan Presiden BEM untuk proposal/LPJ, baik event maupun lomba
            </div>
          </div>

          <div className="flex flex-col content-center justify-start space-y-6 tracking-tight leading-relaxed text-gray-100">
            <div className="text-2xl font-semibold tracking-tight leading-relaxed text-gray-600">🎰 Nomor Surat</div>
            <Link
              to="/nomor-surat"
              className="py-3 px-4 text-xl font-bold bg-gradient-to-r from-rose-800 to-rose-900 text-gray-100 rounded-lg shadow-md transition ease-linear hover:from-gray-50 hover:to-gray-300 hover:text-black focus:outline-none"
              tabIndex="-1"
            >
              Permintaan Saya 📨
            </Link>
            <Link
              to="/nomor-surat/new"
              className="py-3 px-4 text-xl font-bold bg-gradient-to-r from-rose-800 to-rose-900 text-gray-100 rounded-lg shadow-md transition ease-linear hover:from-gray-50 hover:to-gray-300 hover:text-black focus:outline-none"
              tabIndex="-1"
            >
              Ajukan Permintaan 🙏
            </Link>
            <div className="tracking-tight leading-relaxed text-gray-500">
              Untuk <b>internal BEM FILKOM</b> yang memerlukan penomoran untuk surat keluar, penerbitan sertifikat, surat keterangan aktif, dll
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
