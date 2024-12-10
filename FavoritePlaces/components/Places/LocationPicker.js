import { useState } from "react";
import { StyleSheet, Alert, Button, Image, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import ButtonOutlined from "../ui/ButtonOutlined";

import { getMapPreview } from "../../utils/location";
import { Colors } from "../../colors";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInformation, requestPermission] = useState();
  useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPerimissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant location permissions to use this app."
      );

      return false;
    }

    return true;
  }

  let locationPreview = <Text>No location picked yet.</Text>;

  async function handleGetLocation() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords,
      lng: location.coords.longitude,
    });
  }

  function handlePickOnMap() {}

  if (pickedLocation) {
    <Image
      style={styles.image}
      source={{
        uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
      }}
    />;
  }

  return (
    <View>
      <View style={styles.mapPreviewCtn}>{locationPreview}</View>
      <View style={styles.actions}>
        <Button
          color={Colors.primary500}
          title="Locate User"
          onPress={handleGetLocation}
        />
        <ButtonOutlined icon="map" onPress={handlePickOnMap}>
          Pick on Map
        </ButtonOutlined>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreviewCtn: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
