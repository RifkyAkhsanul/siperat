import { PageTitle } from '../components';
import { useHistory } from 'react-router';

const Success = () => {
  const history = useHistory();

  return (
    <>
      <PageTitle title="Submit berhasil!" description="Data telah berhasil dikirim" icon="✅" />

      <section className="relative flex flex-col flex-grow px-12 py-28 bg-gray-100 pattern-circuitry">
        <button
          onClick={() => history.goBack()}
          className="self-center py-3 px-4 text-xl font-bold bg-gradient-to-r from-rose-800 to-rose-900 text-gray-100 rounded-lg shadow-md transition ease-linear hover:from-gray-50 hover:to-gray-300 hover:text-black focus:outline-none"
          tabIndex="-1"
        >
          🏠 Dashboard
        </button>
      </section>
    </>
  );
};

export default Success;
