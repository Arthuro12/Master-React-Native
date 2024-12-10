import { useState } from "react";
import { StyleSheet, Alert, Image, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import ButtonOutlined from "./ButtonOutlined.js";

import { Colors } from "../../colors.js";

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPerimissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPerimissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPerimissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant camera permissions to use this app."
      );

      return false;
    }

    return true;
  }

  async function handlePress() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreviewCtn}>{imagePreview}</View>
      <ButtonOutlined icon="camera" onPress={handlePress}>
        Take Image
      </ButtonOutlined>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreviewCtn: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
