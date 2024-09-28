import './App.scss';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import { YMaps } from '@pbe/react-yandex-maps';

const App = () => {
  const isAuth = true;

  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header></Header>
      </div>
      <div className='main-container'>
        <div className='sidebar-container'>
          {isAuth &&
            <SideBar></SideBar>
          }
        </div>
        <div className='app-content'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );

}

export default App;
