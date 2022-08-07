import React, { useState } from 'react';

import NavigationBar from './navigation-bar';
import NavigationMenu from './navigation-menu';

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
      <NavigationBar menuHandler={openMenuHandler} />
      <NavigationMenu open={showMenu} onClose={closeMenuHandler} />
    </>
  );
};

export default Navigation;
