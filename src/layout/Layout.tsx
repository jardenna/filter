import { Outlet } from 'react-router';
import Nav from './nav/Nav';

const Layout = () => (
  <div className="main-container">
    <header>
      <div className="container">
        <div>Logo</div> <Nav />
      </div>
    </header>
    <main>
      <div className="container">
        <Outlet />
      </div>
    </main>
    <footer>
      <div className="container">Footer</div>
    </footer>
  </div>
);

export default Layout;
