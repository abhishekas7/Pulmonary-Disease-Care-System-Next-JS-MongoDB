
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/Test';
import Admindash from './pages/Admindash';
import Doctordash from './pages/Doctordash';
import Userdash from './pages/Userdash';


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


</Routes>
</BrowserRouter>

  );
}

export default App;
