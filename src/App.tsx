import React from 'react';
import Navigation from 'src/common/navigation';

// Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from 'src/pages/home';
import Products from 'src/pages/products';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
