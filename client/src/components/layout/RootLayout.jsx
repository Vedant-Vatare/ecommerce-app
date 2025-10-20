import { Outlet } from 'react-router-dom';
import MobileNavigationLayout from './MobileNavigation';
import RootHeaderLayout from './RootHeader';
import TopBanner from './TopBanner';
import Footer from '../Footer';
import ScrollManager from '@/utils/ScrollManager';

const RootLayout = () => {
  return (
    <>
      <TopBanner />
      <RootHeaderLayout />
      <ScrollManager />
      <main className="min-h-screen pb-[80px] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNavigationLayout />
    </>
  );
};

export default RootLayout;
