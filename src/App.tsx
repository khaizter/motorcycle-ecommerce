import React from 'react';
import Navigation from 'src/common/navigation';

// Routing
import { BrowserRouter } from 'react-router-dom';

// Components
import RoutesManager from 'src/setup/routes-manager';
import CartDrawer from 'src/common/cart-drawer';

// Context Providers
import { CartProvider } from 'src/context/cart-context';
import { AuthProvider } from 'src/context/auth-context';
import SnackBar from 'src/setup/snack-bar';

const App: React.FC = () => {
  return (
    <SnackBar>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navigation />
            <RoutesManager />
            <CartDrawer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </SnackBar>
  );
};

export default App;
