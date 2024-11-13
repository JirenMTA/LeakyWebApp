import './App.scss';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import { setupAxiosInterceptors } from './utils/axiosCustomize';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const App = (props) => {
  const [colapseOnMobile, setColapseOnMobile] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setupAxiosInterceptors(navigate, dispatch);
  }, [navigate, dispatch]);

  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header colapseOnMobile={colapseOnMobile} setColapseOnMobile={setColapseOnMobile}></Header>
      </div>
      <div className='main-container'>
        <div className='sidebar-container'>
          <SideBar colapseOnMobile={colapseOnMobile} setColapseOnMobile={setColapseOnMobile}></SideBar>
        </div>
        <div className='app-content'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );

}

export default App;
