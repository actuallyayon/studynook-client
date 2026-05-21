import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - var(--nav-height) - 200px)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
