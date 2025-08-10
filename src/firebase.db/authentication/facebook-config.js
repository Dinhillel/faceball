import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

const facebookSignIn = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining the access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    await auth().signInWithCredential(facebookCredential);
    console.log('User signed in with Facebook!');
  } catch (error) {
    console.error('Error during Facebook Sign-In:', error);
  }
};

export { facebookSignIn };
