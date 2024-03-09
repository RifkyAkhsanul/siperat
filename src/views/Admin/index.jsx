import { NavLink } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import { CheckUser, PageTitle } from '../../components';

import AdminDashboard from './Dashboard';
import ListNomorSurat from './ListNomorSurat';
import ListBukuTamu from './ListBukuTamu';
import ListRequestTTD from './ListRequestTTD';

const Admin = () => {
  return (
    <>
      <CheckUser redirect />
      <PageTitle title="Admin Panel" description="Kelola buku tamu, permintaan nomor surat, dan request TTD" icon="👩‍💻" />

      <section id="menu" className="relative flex flex-col flex-grow pb-16 bg-gray-100 pattern-circuitry">
        <aside className="self-center flex flex-row w-full py-6 px-6 justify-center bg-white pattern-circuitry space-x-8">
          <NavLink
            exact
            to="/admin/buku-tamu"
            className="font-semibold box-border py-2 px-4 rounded-lg transition-all ease-linear focus:outline-none disabled:opacity-40 disabled:pointer-events-none"
            tabIndex="-1"
            activeClassName="bg-gradient-to-r from-rose-800 to-rose-900 text-white"
          >
            📓 Admin Buku Tamu
          </NavLink>
          <NavLink
            exact
            to="/admin/request-ttd"
            className="font-semibold box-border py-2 px-4 rounded-lg transition-all ease-linear focus:outline-none disabled:opacity-40 disabled:pointer-events-none"
            tabIndex="-1"
            activeClassName="bg-gradient-to-r from-rose-800 to-rose-900 text-white"
          >
            ✍️ Admin Request TTD
          </NavLink>
          <NavLink
            exact
            to="/admin/nomor-surat"
            className="font-semibold box-border py-2 px-4 rounded-lg transition-all ease-linear focus:outline-none disabled:opacity-40 disabled:pointer-events-none"
            tabIndex="-1"
            activeClassName="bg-gradient-to-r from-rose-800 to-rose-900 text-white"
          >
            🎰 Admin Nomor Surat
          </NavLink>
        </aside>

        <Switch>
          <Route exact path="/admin" component={AdminDashboard} />
          <Route path="/admin/buku-tamu" component={ListBukuTamu} />
          <Route path="/admin/request-ttd" component={ListRequestTTD} />
          <Route path="/admin/nomor-surat" component={ListNomorSurat} />
        </Switch>
      </section>
    </>
  );
};

export default Admin;
