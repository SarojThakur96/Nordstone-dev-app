import React, {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  };

  const onResetPasswordPress = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('email sent');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{width: '100%'}}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('../../assets/images/download.jpeg')}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => onResetPasswordPress()}>
          <Text style={styles.buttonTitle}>Reset Password</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '35%',
    alignItems: 'center',
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 120,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    color: '#000',
  },
  forgetPassword: {
    color: 'red',
    alignSelf: 'flex-end',
    marginRight: 30,
  },
  button: {
    backgroundColor: '#000000',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d',
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
