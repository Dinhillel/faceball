import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const signInWithGoogleOrEmail = async (email, password) => {
  try {
    //try to connect Google
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    console.log('User signed in with Google!');
  } catch (googleError) {
    console.log('Google sign-in failed, trying email...');

    // if fail connet with gmail and  pasword
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('User signed in with Email!');
    } catch (emailError) {
      console.error('Error during Email Sign-In:', emailError);
    }
  }
};
