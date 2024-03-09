import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './styles/base.css';
import './styles/style.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './views/Home';
import NewBukuTamu from './views/BukuTamu/NewBukuTamu';
import Login from './views/Login';
import Success from './views/Success';
import NomorSurat from './views/NomorSurat';
import Dashboard from './views/Dashboard';
import Admin from './views/Admin';
import RequestTTD from './views/RequestTTD';

const ScrollToTop = ({ children }) => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location]);
  return children;
};

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <ScrollToTop>
        {/*Landing page*/}
        <Route exact path="/" component={Home} />
        {/*Login page*/}
        <Route path="/login" component={Login} />
        {/*Dashboard*/}
        <Route path="/dashboard" component={Dashboard} />
        {/*Nomor surat*/}
        <Route path="/nomor-surat" component={NomorSurat} />
        {/*Nomor surat*/}
        <Route path="/request-ttd" component={RequestTTD} />
        {/*NewBukuTamu*/}
        <Route path="/buku-tamu/" component={NewBukuTamu} />
        {/*Admin*/}
        <Route path="/admin/" component={Admin} />
        {/*Success*/}
        <Route path="/success" component={Success} />
      </ScrollToTop>
    </Switch>
    <Footer />
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
