import { NavLink } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import { CheckUser, PageTitle } from '../../components';

import ListNomorSurat from './ListNomorSurat';
import NewNomorSurat from './NewNomorSurat';

const NomorSurat = () => {
  return (
    <>
      <CheckUser redirect />

      <PageTitle title="Permintaan Nomor Surat" description="Klik pada surat untuk melihat detail" icon="🎰" />

      <section id="menu" className="relative flex flex-col flex-grow pb-16 bg-gray-100 pattern-circuitry">
        <aside className="self-center flex flex-row w-full py-6 px-6 justify-center bg-white pattern-circuitry space-x-8">
          <NavLink
            exact
            to="/nomor-surat"
            className="font-semibold box-border py-2 px-4 rounded-lg transition-all ease-linear focus:outline-none disabled:opacity-40 disabled:pointer-events-none"
            tabIndex="-1"
            activeClassName="bg-gradient-to-r from-rose-800 to-rose-900 text-white"
          >
            📨 Permintaan Nomor Surat Saya
          </NavLink>
          <NavLink
            to="/nomor-surat/new"
            className="font-semibold box-border py-2 px-4 rounded-lg transition-all ease-linear focus:outline-none disabled:opacity-40 disabled:pointer-events-none"
            tabIndex="-1"
            activeClassName="bg-gradient-to-r from-rose-800 to-rose-900 text-white"
          >
            🙏 Ajukan Permintaan
          </NavLink>
        </aside>

        <Switch>
          <Route exact path="/nomor-surat" component={ListNomorSurat} />
          <Route path="/nomor-surat/new" component={NewNomorSurat} />
        </Switch>
      </section>
    </>
  );
};

export default NomorSurat;
