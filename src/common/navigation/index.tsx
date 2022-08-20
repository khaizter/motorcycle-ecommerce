import React, { useContext, useState } from 'react';

import NavigationBar from './navigation-bar';
import NavigationMenu from './navigation-menu';

import { NavigationItem } from 'src/common/navigation/model';
import { AuthContext } from 'src/context/auth-context';

const navigations: Array<NavigationItem> = [
  {
    label: 'Home',
    path: '/',
    authentication: false
  },
  {
    label: 'Products',
    path: '/products',
    authentication: false
  },
  {
    label: 'Login',
    path: '/login',
    authentication: true
  },
  {
    label: 'Sign Up',
    path: '/signup',
    authentication: true
  }
];

const Navigation: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { isLoggedIn } = useContext(AuthContext);
  const authenticatedNavigations = navigations.filter(navigation => !navigation.authentication);

  const openMenuHandler = () => {
    setShowMenu(true);
  };

  const closeMenuHandler = () => {
    setShowMenu(false);
  };

  return (
    <>
      <NavigationBar menuHandler={openMenuHandler} navigations={isLoggedIn ? authenticatedNavigations : navigations} />
      <NavigationMenu
        open={showMenu}
        onClose={closeMenuHandler}
        navigations={isLoggedIn ? authenticatedNavigations : navigations}
      />
    </>
  );
};

export default Navigation;
