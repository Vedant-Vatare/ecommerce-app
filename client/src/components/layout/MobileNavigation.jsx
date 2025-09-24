import { Link } from 'react-router-dom';
import { HomeIcon, ShoppingBag, User2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const MobileNavigationLayout = () => {
  const path = useLocation().pathname;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around  font-heading text-xs  font-semibold tracking-wide z-[99999]">
      <Link to="/" className="flex flex-col items-center cursor-pointer">
        <span className="rounded-full p-3 bg-accent/70">
          <HomeIcon className="w-5 h-5" />
        </span>
        <span className={`${path === '/' ? 'text-primary' : ''}`}>Home</span>
      </Link>
      <Link to="/shop" className="flex flex-col items-center cursor-pointer">
        <span className="rounded-full p-3 bg-accent">
          <ShoppingBag className="w-5 h-5" />
        </span>
        <span className={`${path === '/shop' ? 'text-primary' : ''}`}>
          Shop
        </span>
      </Link>
      <Link to="/account" className="flex flex-col items-center cursor-pointer">
        <span className="rounded-full p-3 bg-accent">
          <User2 className="h-5 w-5" />
        </span>
        <span className={`${path === '/account' ? 'text-primary' : ''}`}>
          Account
        </span>
      </Link>
    </div>
  );
};

export default MobileNavigationLayout;
