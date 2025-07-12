import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { firebase, auth, firestore, storage } from './firebaseConfig'; 
import store from '../../../app.redux/store';
import { customTheme } from './theme';

const App = () => {
  // TODO: Implement useFirebaseData or remove this call if unnecessary

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={customTheme}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
