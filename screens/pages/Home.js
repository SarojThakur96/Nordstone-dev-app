import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  HomeIcon,
  UploadIcon,
  CalculatorIcon,
  DocumentTextIcon,
} from 'react-native-heroicons/solid';
import Landing from './Landing';
import ImageUpload from './ImageUpload';
import Logger from './Logger';
import Calculator from './Calculator';
export const Tab = createMaterialBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{}}
      barStyle={{
        padding: 10,
        backgroundColor: '#fff',
      }}
      activeColor="#404CCF"
      inactiveColor="#828282">
      <Tab.Screen
        component={Landing}
        name="HOME"
        options={{
          tabBarIcon: ({color}) => <HomeIcon color={color} size={25} />,
        }}
      />
      <Tab.Screen
        component={ImageUpload}
        name="UPLOAD"
        options={{
          tabBarIcon: ({color}) => <UploadIcon color={color} size={25} />,
        }}
      />
      <Tab.Screen
        component={Logger}
        name="LOGGER"
        options={{
          tabBarIcon: ({color}) => <DocumentTextIcon color={color} size={25} />,
        }}
      />
      <Tab.Screen
        component={Calculator}
        name="CALCULATOR"
        options={{
          tabBarIcon: ({color}) => <CalculatorIcon color={color} size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
