import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import HomePage from './components/Home/HomePage';
import { ToastContainer } from 'react-toastify';
import Login from './components/Auth/Login'
import Basket from './components/Product/Basket';
import Signup from './components/Auth/Signup';
import Purchased from './components/Purchased/Purchased';
import ProductManager from './components/Product/Admin/ProductManager';
import PromocodeManager from './components/Promocode/PromocodeManager';
import Profile from './components/User/Profile';
import './index.scss'

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage></HomePage>}></Route>
                    <Route element={<Basket />} path='/basket'></Route>
                    <Route path='/purchased' element={<Purchased />}></Route>
                    <Route path='/admin/productmanager' element={<ProductManager />}></Route>
                    <Route path='/admin/promocodemanager' element={<PromocodeManager />}></Route>
                    <Route path='/profile' element={<Profile />}></Route>
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </>
    )
}

export default Layout;