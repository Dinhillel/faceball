import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

const appleSignIn = async () => {
  try {
    const response = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const { identityToken } = response;
    if (!identityToken) {
      throw 'Apple Sign-In failed - no identity token returned';
    }

    const appleCredential = auth.AppleAuthProvider.credential(identityToken);
    await auth().signInWithCredential(appleCredential);
    console.log('User signed in with Apple!');
  } catch (error) {
    console.error('Error during Apple Sign-In:', error);
  }
};

export { appleSignIn };
