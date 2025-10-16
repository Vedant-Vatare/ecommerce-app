import { Outlet } from 'react-router-dom';
import MobileNavigationLayout from './MobileNavigation';
import RootHeaderLayout from './RootHeader';

const RootLayout = () => {
  return (
    <>
      <RootHeaderLayout />
      <main className="pb-[80px] md:pb-0">
        <Outlet />
      </main>
      <MobileNavigationLayout />
    </>
  );
};

export default RootLayout;
