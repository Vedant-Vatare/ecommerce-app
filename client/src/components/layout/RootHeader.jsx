import { Search, ShoppingBagIcon, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
const RootHeaderLayout = () => {
  return (
    <header className="sticky top-0 z-[99999] h-14 max-h-14 bg-white shadow-md">
      <div className="flex h-full w-full items-center justify-between gap-2 px-1">
        <div className="flex h-full items-center">
          <div className="grid w-36 place-items-center md:h-14 md:w-48">
            <img className="object-cover" src={logo} alt="Sticker studio" />
          </div>
        </div>
        <div className="font-heading hidden w-max items-center gap-12 md:flex">
          <span className="w-max">
            <Link to="/">Home</Link>
          </span>
          <span className="w-max">
            <Link to="/shop">Collections</Link>
          </span>
          <span className="w-max">
            <Link to="/contact">Contact Us</Link>
          </span>
        </div>

        <div className="mr-3 flex items-center gap-3">
          <div className="relative grid h-full min-w-24 max-w-80 place-items-center">
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="focus:ring-accent h-9 w-full rounded-sm border border-gray-300 p-4 px-4 font-sans font-medium focus:outline-none focus:ring-2"
            />
            <Search className="absolute right-2 h-[90%] w-max cursor-pointer rounded-full bg-white p-2" />
          </div>
          <span className="bg-primary-foreground inline-flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full">
            <ShoppingBagIcon className="h-5 w-5" />
          </span>
          <span className="hidden aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white md:inline-flex">
            <User2 className="h-5 w-5" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default RootHeaderLayout;
