import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'


import AdminReducer from './reducers/admin';
import './stylesheets/index.css';

import {initialUser, initialEdit, initialMessage, initialData } from '../../data/data';
//=============================================================\
const initialSaved = {
  edit: initialEdit,
  message: initialMessage,
  user: initialUser
}

// const initialState = {
//   ...initialSaved,
//   rate: data
// };

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({edit: state.edit, message: state.message, user: state.user});
    localStorage.setItem('pt', serializedState);
  }
  catch(err){

  }
};

// const storage = JSON.parse(localStorage.pt);
const initial = (localStorage.pt !== undefined) ? JSON.parse(localStorage.pt) : initialSaved;

const store = createStore(
  AdminReducer, {...initial, data: initialData}, applyMiddleware(thunk)
);

store.subscribe(() => { saveState(store.getState()); });


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
