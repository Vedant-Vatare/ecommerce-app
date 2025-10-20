import { Outlet } from 'react-router-dom';
import MobileNavigationLayout from './MobileNavigation';
import RootHeaderLayout from './RootHeader';
import TopBanner from './TopBanner';
import Footer from '../Footer';

const RootLayout = () => {
  return (
    <>
      <TopBanner />
      <RootHeaderLayout />
      <main className="pb-[80px] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNavigationLayout />
    </>
  );
};

export default RootLayout;
