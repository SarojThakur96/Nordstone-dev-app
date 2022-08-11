import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Button, TextInput} from 'react-native-paper';

const Logger = () => {
  const userId = 'hgdugdiujriojojhfujhuvjhio2';
  const [message, setMessage] = useState('');
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(userId)
      .collection('Notes')
      .onSnapshot(documentSnapshot => {
        setFetchedData(documentSnapshot?.docs);
        console.log('User data: ', documentSnapshot.docs[2]._data.notes);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);

  const saveToFirebase = () => {
    firestore()
      .collection('Users')
      .doc(userId)
      .collection('Notes')
      .add({
        notes: message,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        alignItem: 'center',
      }}>
      <View style={{marginVertical: 10, marginHorizontal: 10}}>
        <Text style={{padding: 10, fontSize: 20}}>Please Write Your Notes</Text>
        <TextInput
          multiline
          numberOfLines={3}
          value={message}
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
          onPress={saveToFirebase}
          style={{marginTop: 10}}>
          Save
        </Button>
      </View>
      <View
        style={{
          borderWidth: 1,
          padding: 10,
          marginHorizontal: 20,
        }}>
        {fetchedData.map(item => (
          <View>
            <Text>{item?._data.notes}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Logger;
