import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'
import Brand from './pages/Brand';
import Order from './pages/Order';
import Product from './pages/Product';
import Report from './pages/Report';
import Setting from './pages/Setting';
import Categories from './pages/Categories';
import PrivateRoute from './utils/PrivateRoute';

import './App.css';

const App = () => {
  
  return (
    <Routes>
      <Route path='signin' element={<SignIn/>} />
      <Route path='/' element={<PrivateRoute component={Home} />}>
        <Route index element={<Dashboard />} />
        <Route path='brand' element={<Brand />} />
        <Route path='Categories' element={<Categories/>} />
        <Route path='product' element={<Product/>} />
        <Route path='order' element={<Order/>} />
        <Route path='report' element={<Report/>} />
        <Route path='setting' element={<Setting/>} />
      </Route>
    </Routes>
  );
}

export default App;
