import { useContext, useState } from "react";
import { Alert } from "react-native";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../store/auth-context";

import { login } from "../util/auth";

function LoginScreen() {
  const authContext = useContext(AuthContext);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function handleSignin({ email, password }) {
    setIsAuthenticating(true);

    try {
      const token = await login(email, password);
      authContext.authenticate(token);
      // console.log("Token (Login):", authContext.token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Couldn´t log you. Please check your credentials.",
        [
          {
            text: "",
            style: "cancel",
          },
        ]
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={handleSignin} />;
}

export default LoginScreen;
