import React from 'react';
import ReactDom from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Main from './pages/Main';
import "./styles/index.css"

ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);