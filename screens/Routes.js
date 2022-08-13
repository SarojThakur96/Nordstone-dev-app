import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {authContext} from '../context/authContext';
import Home from './pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const {user, setUser} = useContext(authContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
