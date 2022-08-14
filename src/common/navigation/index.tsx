import React, { useState } from 'react';

import NavigationBar from './navigation-bar';
import NavigationMenu from './navigation-menu';

import { NavigationItem } from 'src/common/navigation/model';

const navigations: Array<NavigationItem> = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Products',
    path: '/products'
  },
  {
    label: 'Login',
    path: '/login'
  },
  {
    label: 'Sign Up',
    path: '/signup'
  }
];

const Navigation: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const openMenuHandler = () => {
    setShowMenu(true);
  };

  const closeMenuHandler = () => {
    setShowMenu(false);
  };

  return (
    <>
      <NavigationBar menuHandler={openMenuHandler} navigations={navigations} />
      <NavigationMenu open={showMenu} onClose={closeMenuHandler} navigations={navigations} />
    </>
  );
};

export default Navigation;
