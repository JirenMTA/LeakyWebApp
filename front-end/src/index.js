import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Layout from './Layout';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Layout></Layout>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
