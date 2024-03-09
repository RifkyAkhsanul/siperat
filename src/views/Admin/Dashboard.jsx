import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <section className="relative flex flex-col flex-grow px-12 pt-24 pb-12 bg-gray-100 pattern-circuitry">
    <div className="self-center grid grid-cols-1 gap-8 sm:grid-cols-3 w-full max-w-4xl">
      <div className="flex flex-col content-center justify-start space-y-6 tracking-tight leading-relaxed text-gray-100">
        <div className="text-2xl font-semibold tracking-tight leading-relaxed text-gray-600">📓 Buku Tamu</div>
        <Link
          to="/admin/buku-tamu"
          className="py-3 px-4 text-xl font-bold bg-gradient-to-r from-rose-800 to-rose-900 text-gray-100 rounded-lg shadow-md transition ease-linear hover:from-gray-50 hover:to-gray-300 hover:text-black focus:outline-none"
          tabIndex="-1"
        >
          Buka Admin 👩‍💻
        </Link>
      </div>

      <div className="flex flex-col content-center justify-start space-y-6 tracking-tight leading-relaxed text-gray-100">
        <div className="text-2xl font-semibold tracking-tight leading-relaxed text-gray-600">✍️ Request TTD</div>
        <Link
          to="/admin/request-ttd"
          className="py-3 px-4 text-xl font-bold bg-gradient-to-r from-rose-800 to-rose-900 text-gray-100 rounded-lg shadow-md transition ease-linear hover:from-gray-50 hover:to-gray-300 hover:text-black focus:outline-none"
          tabIndex="-1"
        >
          Buka Admin 👩‍💻
        </Link>
      </div>

      <div className="flex flex-col content-center justify-start space-y-6 tracking-tight leading-relaxed text-gray-100">
        <div className="text-2xl font-semibold tracking-tight leading-relaxed text-gray-600">🎰 Nomor Surat</div>
        <Link
          to="/admin/nomor-surat"
          className="py-3 px-4 text-xl font-bold bg-gradient-to-r from-rose-800 to-rose-900 text-gray-100 rounded-lg shadow-md transition ease-linear hover:from-gray-50 hover:to-gray-300 hover:text-black focus:outline-none"
          tabIndex="-1"
        >
          Buka Admin 👩‍💻
        </Link>
      </div>
    </div>
  </section>
);

export default AdminDashboard;
