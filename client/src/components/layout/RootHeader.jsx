import { Search, ShoppingBagIcon, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const RootHeaderLayout = () => {
  return (
    <header className="shadow-md max-h-14 h-14 sticky top-0 bg-white z-[99999]">
      <div className="flex w-full items-center justify-between md:px-8 px-1 h-full">
        <div className="h-full flex items-center">
          <div className="md:h-14 md:w-48 w-36 grid place-items-center">
            <img
              className="object-cover"
              src="/Sticker-Studio.png"
              alt="Sticker studio"
            />
          </div>
        </div>
        <div className="md:flex hidden gap-12 items-center font-semibold font-heading">
          <span>
            <Link to="/">Home</Link>
          </span>
          <span>
            <Link to="/shop">Collections</Link>
          </span>
          <span>
            <Link to="/contact">Contact Us</Link>
          </span>
        </div>

        <div className="flex gap-3 items-center mr-3">
          <div className="relative grid place-items-center max-w-80  min-w-24  h-full ">
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="font-heading font-medium p-4 w-full h-full max-h-6 rounded-sm border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Search className="w-max h-[90%] absolute right-2 p-2 cursor-pointer bg-accent" />
          </div>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent cursor-pointer">
            <ShoppingBagIcon className="w-5 h-5" />
          </span>
          <span className="md:inline-flex hidden items-center justify-center w-10 h-10 rounded-full bg-accent cursor-pointer">
            <User2 className="w-5 h-5" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default RootHeaderLayout;
