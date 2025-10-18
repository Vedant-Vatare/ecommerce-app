import { Search, ShoppingBagIcon, User2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { BorderTrail } from '../ui/border-trail';
import { Button } from '../ui/button';

const RootHeaderLayout = () => {
  return (
    <header className="sticky top-0 z-[9999] bg-white shadow-md">
      <div className="flex h-14 w-full items-center justify-between px-3 md:gap-2">
        <div className="flex h-full items-center">
          <div className="grid w-32 place-items-center md:w-48">
            <img
              className="h-10 object-contain"
              src={logo}
              alt="Sticker studio"
            />
          </div>
        </div>

        <nav className="font-heading hidden w-max items-center gap-6 md:flex md:gap-10">
          <Link className="w-max" to="/">
            Home
          </Link>
          <Link className="w-max" to="/shop">
            Collections
          </Link>
          <Link className="w-max" to="/contact">
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 md:flex">
            <div className="relative min-w-10 lg:w-80">
              <InputSearchbar />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={'outline'}
              className="bg-primary-foreground inline-flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant={'outline'}
              className="bg-primary-foreground inline-flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            >
              <ShoppingBagIcon className="h-5 w-5" />
            </Button>
            <Button
              variant={'outline'}
              className="bg-primary-foreground hidden aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full md:inline-flex"
            >
              <User2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      {/* small screen search bar */}
      <div className="flex w-full items-center gap-3 px-3 pb-2 md:hidden">
        <div className="relative flex w-full items-center">
          <InputSearchbar />
        </div>
      </div>
    </header>
  );
};

const InputSearchbar = () => {
  return (
    <div className="flex h-full w-full items-center rounded-sm">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="focus:ring-accent text-md h-max w-full rounded-sm border-2 border-gray-300 p-2 px-4 pr-10 font-sans focus:outline-none focus:ring-2"
      />
      <Button
        variant={'outline'}
        className="bg-muted absolute right-2 my-1 flex h-8 w-8 items-center justify-center rounded-full p-0"
      >
        <Search className="h-4 w-4 cursor-pointer" />
      </Button>
      <BorderTrail
        className="bg-linear-to-l from-blue-200 via-blue-500 to-blue-200 dark:from-blue-400 dark:via-blue-500 dark:to-blue-700"
        size={120}
      />
    </div>
  );
};

export default RootHeaderLayout;
