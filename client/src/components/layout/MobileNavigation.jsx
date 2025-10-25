import { Link } from 'react-router-dom';
import { HomeIcon, ShoppingBag, User2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const MobileNavigationLayout = () => {
  const path = useLocation().pathname;

  const currentPage = () => {
    if (path === '/') return 'home';
    if (path === '/shop' || path.startsWith('/shop/')) return 'shop';
    if (path === '/account' || path.startsWith('/account/')) return 'account';
    return '';
  };

  return (
    <div className="font-heading fixed bottom-0 left-0 right-0 z-[99999] flex justify-around border-t border-gray-200 bg-white p-2 text-xs font-semibold tracking-wide md:hidden">
      <Link to="/" className="flex cursor-pointer flex-col items-center">
        <span
          className={`rounded-full p-3 transition-colors ${currentPage === 'home' ? 'bg-primary text-white' : 'bg-primary-foreground'}`}
        >
          <HomeIcon className="h-5 w-5" />
        </span>
        <span className={`${currentPage === 'home' ? 'text-primary' : ''}`}>
          Home
        </span>
      </Link>
      <Link to="/shop" className="flex cursor-pointer flex-col items-center">
        <span
          className={`rounded-full p-3 transition-colors ${currentPage === 'shop' ? 'bg-primary text-white' : 'bg-primary-foreground'}`}
        >
          <ShoppingBag className="h-5 w-5" />
        </span>
        <span className={`${currentPage === 'shop' ? 'text-primary' : ''}`}>
          Shop
        </span>
      </Link>
      <Link to="/account" className="flex cursor-pointer flex-col items-center">
        <span
          className={`rounded-full p-3 transition-colors ${currentPage === 'account' ? 'bg-primary text-white' : 'bg-primary-foreground'}`}
        >
          <User2 className="h-5 w-5" />
        </span>
        <span className={`${currentPage === 'account' ? 'text-primary' : ''}`}>
          Account
        </span>
      </Link>
    </div>
  );
};

export default MobileNavigationLayout;
