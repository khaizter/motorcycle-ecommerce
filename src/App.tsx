import React from 'react';
import Navigation from 'src/common/navigation';

// Routing
import { BrowserRouter } from 'react-router-dom';

// Components
import RoutesManager from 'src/setup/routes-manager';
import Cart from 'src/common/cart';

// Context Providers
import { CartProvider } from 'src/context/cart-context';
import { AuthProvider } from 'src/context/auth-context';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navigation />
          <RoutesManager />
        </BrowserRouter>
        <Cart />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
