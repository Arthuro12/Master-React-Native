import { useContext, useState } from "react";
import { Alert } from "react-native";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../store/auth-context";

import { createUser } from "../util/auth";

function SignupScreen() {
  const authContext = useContext(AuthContext);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function handleSignup({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Couldn´t create user. Please check your input and make sure they are valid."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={handleSignup} />;
}

export default SignupScreen;
