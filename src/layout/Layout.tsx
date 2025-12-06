import { Outlet } from 'react-router';
import Nav from './nav/Nav';

const Layout = () => (
  <div className="main-container">
    <header>
      <div>Logo</div> <Nav />
    </header>
    <main>
      <Outlet />
    </main>
    <footer>Footer</footer>
  </div>
);

export default Layout;
