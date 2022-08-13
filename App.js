/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useState} from 'react';

import SplashScreen from 'react-native-splash-screen';
import {AuthProvider} from './context/authContext';
import Routes from './screens/Routes';

const App = () => {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
