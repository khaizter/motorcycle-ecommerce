import React, { useState } from 'react';

import NavigationBar from './navigation-bar';
import NavigationMenu from './navigation-menu';

interface propType {
  openCart: () => void;
}

const Navigation: React.FC<propType> = props => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const openMenuHandler = () => {
    setShowMenu(true);
  };

  const closeMenuHandler = () => {
    setShowMenu(false);
  };

  return (
    <>
      <NavigationBar menuHandler={openMenuHandler} openCart={props.openCart} />
      <NavigationMenu open={showMenu} onClose={closeMenuHandler} />
    </>
  );
};

export default Navigation;
