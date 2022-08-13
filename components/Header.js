import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {LogoutIcon} from 'react-native-heroicons/solid';
import auth from '@react-native-firebase/auth';

const Header = () => {
  const Logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('signed out');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        padding: 10,
        // backgroundColor: '#fff',
        // elevation: 5,
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          elevation: 5,
          padding: 5,
        }}>
        <Image
          source={require('../assets/images/download.jpeg')}
          style={{
            width: 50,
            height: 50,
            resizeMode: 'contain',
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          elevation: 5,
          padding: 5,
          //   flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'red',
        }}
        activeOpacity={0.5}
        onPress={Logout}>
        <LogoutIcon size={20} color={'red'} />

        <Text style={{color: 'red'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
