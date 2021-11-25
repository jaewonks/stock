import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Brand from './pages/Brand'
import Categories from './pages/Categories';
import Order from './pages/Order';
import Product from './pages/Product';
import Report from './pages/Report';
import Setting from './pages/Setting';

import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<SignIn/>} />
      <Route path='brand' element={<Brand />} />
      <Route path='categories' element={<Categories/>} />
      <Route path='order' element={<Order />} />
      <Route path='product' element={<Product />} />
      <Route path='report' element={<Report />} />
      <Route path='setting' element={<Setting />} />
    </Routes>
  );
}

export default App;
