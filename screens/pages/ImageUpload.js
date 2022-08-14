import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {CameraIcon, PhotographIcon} from 'react-native-heroicons/solid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import {Button, TextInput} from 'react-native-paper';
import Header from '../../components/Header';
import {authContext} from '../../context/authContext';

const ImageUpload = () => {
  const [imageFile, setImageFile] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const {user} = useContext(authContext);

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
      .doc(user?.uid)
      .collection('Photos')
      .orderBy('createdAt', 'desc')
      .onSnapshot(documentSnapshot => {
        setFetchedData(documentSnapshot?.docs);
        console.log(documentSnapshot?.docs);
        console.log('User data: ', documentSnapshot?.docs);
      });

    return () => subscriber();
  }, [user]);

  const saveToFirebase = () => {
    firestore()
      .collection('Users')
      .doc(user?.uid)
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
    <>
      <Header />
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
            height: 200,
            width: 200,
            resizeMode: 'contain',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#000000',
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              marginTop: 10,
              padding: 8,
              borderWidth: 1,
              borderColor: '#000000',
              borderTopRightRadius: 12,
              borderBottomLeftRadius: 12,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginRight: 20,
              backgroundColor: '#fff',
            }}
            activeOpacity={0.4}
            onPress={UploadActionCamera}>
            <Text
              style={{
                fontSize: 15,
                color: '#000000',
                marginRight: 5,
                marginBottom: 3,
              }}>
              Launch Camera
            </Text>
            <CameraIcon color="#000000" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 15,
              padding: 8,
              borderWidth: 1,
              borderColor: '#000000',
              borderTopRightRadius: 12,
              borderBottomLeftRadius: 12,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}
            activeOpacity={0.4}
            onPress={UploadActionGallary}>
            <Text
              style={{
                fontSize: 14,
                color: '#000000',
                marginRight: 5,
                marginBottom: 3,
              }}>
              Upload From Gallary
            </Text>
            <PhotographIcon color="#000000" size={18} />
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          color="#000000"
          onPress={saveToFirebase}
          style={{marginTop: 15}}>
          Save
        </Button>

        <ScrollView
          style={{
            borderRadius: 20,
            padding: 10,
            marginHorizontal: 20,
            marginVertical: 10,
            elevation: 3,
            width: '80%',
            backgroundColor: '#E5E5E7',
          }}>
          {fetchedData?.map((item, index) => (
            <View
              key={index + 1}
              style={{
                marginVertical: 5,
                alignItems: 'center',
                padding: 8,
              }}>
              <Image
                source={{
                  uri:
                    item?._data?.photos[0]?.uri ||
                    'https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-portrait.jpg',
                }}
                style={{
                  height: 200,
                  width: 200,
                  resizeMode: 'contain',
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#000000',
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({});
