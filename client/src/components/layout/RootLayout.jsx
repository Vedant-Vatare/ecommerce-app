import { Outlet } from 'react-router-dom';
import MobileNavigationLayout from './MobileNavigation';
import RootHeaderLayout from './RootHeader';
import TopBanner from './TopBanner';

const RootLayout = () => {
  return (
    <>
      <TopBanner />
      <RootHeaderLayout />
      <main className="pb-[80px] md:pb-0">
        <Outlet />
      </main>
      <MobileNavigationLayout />
    </>
  );
};

export default RootLayout;
