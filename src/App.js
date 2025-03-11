import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import store from '../../../redux/store';
import useFirebaseData from './hooks/useFirebaseData';


const App = () => {
  // Initialize Firebase and Firestore Hooks
  useFirebaseData();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />  {/*  \*/}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
