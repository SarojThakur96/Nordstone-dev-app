import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {HomeIcon} from 'react-native-heroicons/solid';
import Landing from './Landing';
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
        component={Landing}
        name="SCAN"
        // options={{
        //   tabBarIcon: ({color}) => (
        //     <FA5 name="camera" color={color} size={25} solid />
        //   ),
        // }}
      />
      <Tab.Screen
        component={Landing}
        name="ACCOUNTe"
        // options={{
        //   tabBarIcon: ({color}) => (
        //     <FA5 name="user" color={color} size={25} solid />
        //   ),
        // }}
        // listeners={({ navigation, route }) => ({
        //   tabPress: e => {
        //      dispatch(setScrollY(0))
        //   },
        // })}
      />
      <Tab.Screen
        component={Landing}
        name="ACCOUNT"
        // options={{
        //   tabBarIcon: ({color}) => (
        //     <FA5 name="user" color={color} size={25} solid />
        //   ),
        // }}
        // listeners={({ navigation, route }) => ({
        //   tabPress: e => {
        //      dispatch(setScrollY(0))
        //   },
        // })}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
