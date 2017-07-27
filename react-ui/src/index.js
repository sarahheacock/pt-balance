import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import AdminReducer from './reducers/admin';

import './stylesheets/index.css';

import { initialData, initialUser, initialEdit, initialMessage, errorStatus } from './data/data';
//=============================================================\


const saveState = (state) => {
  try {
    if(state.message !== errorStatus.expError){
      const serializedState = JSON.stringify(state.user);
      localStorage.setItem('user', serializedState);
    }
    else { //do not save session if logged out
      const serializedInitial = JSON.stringify(initialUser);
      localStorage.setItem('user', serializedInitial);
    }
  }
  catch(err){

  }
};

const storage = (localStorage.user !== undefined) ? JSON.parse(localStorage.user) : initialUser;
const initial = {
        message: initialMessage,
        edit: initialEdit,
        data: initialData,
        user: storage,
      };

const store = createStore(
  AdminReducer, initial, applyMiddleware(thunk)
);

store.subscribe(() => {
  saveState(store.getState());
});


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
