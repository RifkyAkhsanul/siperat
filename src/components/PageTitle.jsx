import { getUserData } from './SessionHelper';

export const PageTitle = ({ title, description, icon }) => (
  <section id="menu" className="relative flex flex-col flex-grow mt-16 px-12 py-16 bg-rose-100 pattern-circuitry border-b-8 border-rose-200">
    <div className="self-center flex flex-col md:flex-row space-y-6 md:space-y-0 w-full md:items-center justify-between max-w-4xl">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row w-full justify-start content-center">
          <div className="hidden content-center justify-center items-center h-16 w-16 mr-8 bg-gray-50 border-4 border-gray-100 rounded-md shadow-2xl lg:flex">
            <span className="self-center text-3xl text-green-700">{icon}</span>
          </div>
          <div className="flex flex-col content-center justify-center">
            <h2 className="text-3xl font-bold text-red-800">{title}</h2>
            <h3 className="text-sm mt-1 text-gray-500">{description}</h3>
          </div>
        </div>
      </div>

      {getUserData && getUserData.nama && (
        <div className="flex text-md font-semibold tracking-tight leading-relaxed text-gray-600">
          Halo, {getUserData.nama.trim().split(/\s+/).slice(0, 2).join(' ')}
          <br />
          {getUserData.prodi}
          <br />
          {getUserData.nim}
        </div>
      )}
    </div>
  </section>
);
