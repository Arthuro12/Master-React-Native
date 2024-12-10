import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, View, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useEffect } from "react";

async function requestPermissionsAsync() {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
}

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Push notifications need the appropriate permissions."
        );
        return;
      }

      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      // console.log(Constants);
      const pushToken = await Notifications.getExpoPushTokenAsync({
        projectId,
      });
      console.log(pushToken);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log("Notification details: ", notification);
        // const userName = notification.request.content.data.userName;
        // console.log(userName);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log("Notification response: ", response);
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  requestPermissionsAsync();

  async function handleScheduleNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "A new Notification",
        body: "This is the body of this new notification",
        data: {
          userName: "Antoine",
        },
      },
      trigger: {
        seconds: 2,
      },
    });
  }

  function handleSendPushNotification() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: "",
        title: "Test - Sent from a device",
        body: "This is a test!"
      })
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={handleScheduleNotification}
      />
      <Button
        title="Send Push  Notification"
        onPress={handleSendPushNotification}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
