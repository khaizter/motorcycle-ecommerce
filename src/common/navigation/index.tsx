import React, { useContext, useState } from 'react';

import NavigationBar from './navigation-bar';
import NavigationMenu from './navigation-menu';

import { NavigationItem } from 'src/common/navigation/model';
import { AuthContext } from 'src/context/auth-context';

const navigations: Array<NavigationItem> = [
  {
    label: 'Home',
    path: '/#hero',
    case: 'always'
  },
  { label: 'About', path: '/#about', case: 'always' },
  { label: 'Services', path: '/#services', case: 'always' },
  { label: 'FAQ', path: '/#faq', case: 'always' },
  {
    label: 'Products',
    path: '/products',
    case: 'always'
  },
  {
    label: 'Login',
    path: '/login',
    case: 'non-authenticated'
  },
  {
    label: 'Sign Up',
    path: '/signup',
    case: 'non-authenticated'
  },
  {
    label: 'Cart',
    path: '/cart',
    case: 'authenticated'
  },
  {
    label: 'Order',
    path: '/order',
    case: 'authenticated'
  }
];

const Navigation: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { isLoggedIn } = useContext(AuthContext);
  const alwaysShownNavigations = navigations.filter(navigation => navigation.case === 'always');
  const authCasedNavigations = navigations.filter(navigation => {
    if (isLoggedIn) return navigation.case === 'authenticated';
    else return navigation.case === 'non-authenticated';
  });
  const availableNavigations = [...alwaysShownNavigations, ...authCasedNavigations];

  const openMenuHandler = () => {
    setShowMenu(true);
  };

  const closeMenuHandler = () => {
    setShowMenu(false);
  };

  return (
    <>
      <NavigationBar menuHandler={openMenuHandler} navigations={availableNavigations} />
      <NavigationMenu open={showMenu} onClose={closeMenuHandler} navigations={availableNavigations} />
    </>
  );
};

export default Navigation;
