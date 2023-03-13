

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/Test';
import Admindash from './pages/Admindash';
import Doctordash from './pages/Doctordash';
import Userdash from './pages/Userdash';
import ProductList from './pages/ProductList';
import ProductScreen from './pages/ProductScreen';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (

<BrowserRouter>

      <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/test' element={<Test/>}/>
<Route path='/admindash' element={<Admindash/>}/>
<Route path='/docdash' element={<Doctordash/>}/>
<Route path='/userdash' element={<Userdash/>}/>
<Route path='/productlist' element={<ProductList/>}/>
<Route path='/singleproduct' element={<ProductScreen/>}/>


</Routes>
</BrowserRouter>

  );
}

export default App;
