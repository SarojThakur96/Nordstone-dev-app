import {View, Text, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Button, TextInput} from 'react-native-paper';
import {authContext} from '../../context/authContext';
import Header from '../../components/Header';
const Logger = () => {
  const [message, setMessage] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const {user} = useContext(authContext);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(user?.uid)
      .collection('Notes')
      .orderBy('createdAt', 'desc')
      .onSnapshot(documentSnapshot => {
        setFetchedData(documentSnapshot?.docs);
        // console.log('User data: ', documentSnapshot.docs[2]._data.notes);
      });

    return () => subscriber();
  }, [user]);

  const saveToFirebase = () => {
    firestore()
      .collection('Users')
      .doc(user?.uid)
      .collection('Notes')
      .add({
        notes: message,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <>
      <Header />
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
          alignItem: 'center',
        }}>
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          <Text style={{padding: 10, fontSize: 20, color: '#000000'}}>
            Please Write Your Notes
          </Text>
          <TextInput
            multiline
            numberOfLines={3}
            value={message}
            mode="outlined"
            activeUnderlineColor="#000000"
            activeOutlineColor="#000000"
            onChangeText={text => setMessage(text)}
            editable
            style={{
              padding: 5,
              backgroundColor: '#E5E5E7',
              color: 'black',
              fontSize: 16,
              textAlignVertical: 'top',
              outlineWidth: 'none',
            }}
          />
          <Button
            mode="contained"
            color="#000000"
            onPress={saveToFirebase}
            style={{marginTop: 10}}>
            Save to Firebase
          </Button>
        </View>
        <ScrollView
          style={{
            borderRadius: 20,
            padding: 10,
            marginHorizontal: 20,
            marginVertical: 10,
            elevation: 3,
            backgroundColor: '#E5E5E7',
          }}>
          {fetchedData?.map((item, index) => (
            <View
              key={index + 1}
              style={{
                borderWidth: 0.5,
                borderRightWidth: 0,
                marginVertical: 10,
                borderTopLeftRadius: 20,
                padding: 10,
                borderColor: '#000000',
                backgroundColor: '#ffffff',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000000',
                }}>
                {item?._data.notes}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Logger;
