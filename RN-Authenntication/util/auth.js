import axios from "axios";

const API_KEY = "AIzaSyDWnnoPMdr_EVV2-ZopO5-hlv0kQYaPWDM";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    const token = response.data.idToken;
    return token;
  } catch (error) {
    console.log(error);
  }

  return token;
}

export async function createUser(email, password) {
  const data = await authenticate("signUp", email, password);
  return data;
}

export async function login(email, password) {
  const data = await authenticate("signInWithPassword", email, password);
  return data;
}
