import { Outlet } from 'react-router-dom';
import MobileNavigationLayout from './MobileNavigation';
import RootHeaderLayout from './RootHeader';

const RootLayout = () => {
  return (
    <>
      <RootHeaderLayout />
      <main>
        <Outlet />
      </main>
      <MobileNavigationLayout />
    </>
  );
};

export default RootLayout;
