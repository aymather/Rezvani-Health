import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import AppNavbar from './components/AppNavbar';
import AppBody from './components/AppBody';
import { clearErrors } from './actions/errorActions';

class App extends Component {
  componentDidMount(){
    store.dispatch(clearErrors());
    store.dispatch(loadUser());
  }
  render(){
    return (
      <Provider store={store} >
        <div className='App'>
            <AppNavbar />
            <AppBody />
        </div>
      </Provider>
    )
  }
}

export default App;
