import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'
import Brand from './pages/Brand';
import Order from './pages/Order';
import Product from './pages/Product';
import Stock from './pages/Stock';
import Report from './pages/Report';
import Setting from './pages/Setting';
import Categories from './pages/Categories';
import UpdateOrders from './pages/Order/UpdateOrders';
import AddOrders from './pages/Order/AddOrders';
import ManageOrders from './pages/Order/ManageOrders';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  
  return (
    <Routes>
      <Route path='signin' element={<SignIn/>} />
      <Route path='/' element={<PrivateRoute component={Home} />}>
        <Route index element={<Dashboard />} />
        <Route path='brand' element={<Brand />} />
        <Route path='categories' element={<Categories/>} />
        <Route path='product' element={<Product/>} />
        <Route path='stock' element={<Stock/>} />
        <Route path='order/*' element={<Order/>}>
          <Route path='update' element={<UpdateOrders/>} />
          <Route path='add' element={<AddOrders/>} />
          <Route path='manage' element={<ManageOrders/>} />
        </Route>
        <Route path='report' element={<Report/>} />
        <Route path='setting' element={<Setting/>} />
      </Route>
    </Routes>
  );
}

export default App;
