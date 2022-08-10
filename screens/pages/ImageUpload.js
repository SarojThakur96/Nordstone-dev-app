import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import {PhotographIcon} from 'react-native-heroicons/solid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImageUpload = () => {
  const [imageFile, setImageFile] = useState([]);

  const UploadAction = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    setImageFile(result.assets);
    console.log(result);
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
        onPress={UploadAction}>
        <Text
          style={{
            fontSize: 16,
            color: 'blue',
            marginRight: 5,
            marginBottom: 3,
          }}>
          Upload Photo
        </Text>
        <PhotographIcon color="blue" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({});
