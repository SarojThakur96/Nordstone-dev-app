import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CameraIcon, PhotographIcon} from 'react-native-heroicons/solid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import {Button, TextInput} from 'react-native-paper';

const ImageUpload = () => {
  const userId = 'hgdugdiujriojojhfujhuvjhio2';

  const [imageFile, setImageFile] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const UploadActionGallary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    setImageFile(result?.assets);
    console.log(result);
  };

  const UploadActionCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
    });
    setImageFile(result?.assets);
    console.log(result);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(userId)
      .collection('Photos')
      .orderBy('createdAt', 'desc')
      .onSnapshot(documentSnapshot => {
        setFetchedData(documentSnapshot?.docs);
        console.log(documentSnapshot?.docs);
        console.log('User data: ', documentSnapshot?.docs[0]?._data?.photos);
      });

    return () => subscriber();
  }, [userId]);

  const saveToFirebase = () => {
    firestore()
      .collection('Users')
      .doc(userId)
      .collection('Photos')
      .add({
        photos: imageFile,
        createdAt: firestore.FieldValue.serverTimestamp(),
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
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri:
            imageFile[0]?.uri ||
            'https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-portrait.jpg',
        }}
        style={{
          marginTop: 10,
          height: 300,
          width: 300,
          resizeMode: 'contain',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#000000',
        }}
      />
      <TouchableOpacity
        style={{
          marginTop: 10,
          padding: 8,
          borderWidth: 1,
          borderColor: 'blue',
          borderTopRightRadius: 12,
          borderBottomLeftRadius: 12,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        activeOpacity={0.4}
        onPress={UploadActionCamera}>
        <Text
          style={{
            fontSize: 16,
            color: 'blue',
            marginRight: 5,
            marginBottom: 3,
          }}>
          Take Photo from Camera
        </Text>
        <CameraIcon color="blue" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 10,
          padding: 8,
          borderWidth: 1,
          borderColor: 'blue',
          borderTopRightRadius: 12,
          borderBottomLeftRadius: 12,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        activeOpacity={0.4}
        onPress={UploadActionGallary}>
        <Text
          style={{
            fontSize: 16,
            color: 'blue',
            marginRight: 5,
            marginBottom: 3,
          }}>
          Upload Photo from Gallary
        </Text>
        <PhotographIcon color="blue" size={20} />
      </TouchableOpacity>
      <Button mode="contained" onPress={saveToFirebase} style={{marginTop: 10}}>
        Save
      </Button>
      <View
        style={{
          borderWidth: 1,
          padding: 10,
          marginHorizontal: 20,
        }}>
        {fetchedData?.map((item, index) => (
          <View key={index + 1}>
            <Image
              source={{
                uri:
                  item?._data?.photos[0]?.uri ||
                  'https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-portrait.jpg',
              }}
              style={{
                marginTop: 10,
                height: 30,
                width: 30,
                resizeMode: 'contain',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#000000',
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({});
