import './App.scss';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import { YMaps } from '@pbe/react-yandex-maps';
import { useMediaQuery } from 'react-responsive';

const App = (props) => {
  const isAuth = true;
  const [colapseOnMobile, setColapseOnMobile] = useState(true);


  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header></Header>
      </div>
      <div className='main-container'>
        <div className='sidebar-container'>
          {isAuth &&
            <SideBar colapseOnMobile={colapseOnMobile} setColapseOnMobile={setColapseOnMobile}></SideBar>
          }
        </div>
        <div className='app-content'>
          <Outlet colapseOnMobile={colapseOnMobile} setColapseOnMobile={setColapseOnMobile}></Outlet>
        </div>
      </div>
    </div>
  );

}

export default App;
