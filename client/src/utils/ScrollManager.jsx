import { useRef } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollManager = () => {
  const location = useLocation();
  const scrollPositions = useRef({});

  useEffect(() => {
    const path = location.pathname;

    if (scrollPositions.current[path] !== undefined) {
      window.scrollTo(0, scrollPositions.current[path]);
    } else {
      window.scrollTo(0, 0);
    }

    const handleScroll = () => {
      scrollPositions.current[path] = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return null;
};

export default ScrollManager;
