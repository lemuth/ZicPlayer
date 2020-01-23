import React, { Component } from 'react';
import Navigation from './navigation/navigation';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import Store from './store/configureStore';

export default class App extends Component {
  render() {
    return (
      <Provider store = { Store }>
        <Navigation/>
      </Provider>
    )
  }

}


