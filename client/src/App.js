import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import AppBody from './components/AppBody';

class App extends Component {
  
  render(){
    return (
      <Provider store={store} >
        <div className='App'>
            <AppBody />
        </div>
      </Provider>
    )
  }
}

export default App;
