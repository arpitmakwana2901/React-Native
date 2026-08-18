import React from 'react';
import {Provider} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import store from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';

// Configure Google Sign-in globally at app launch
GoogleSignin.configure({
  webClientId:
    '303307131508-cs8ecc9qg966p9vchusht5n6lkga8nfl.apps.googleusercontent.com',
});

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;