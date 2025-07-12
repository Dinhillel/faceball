import { useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const useFirebaseData = () => {
  useEffect(() => {
    console.log('Firebase App Name:', firebase.app().name);

    const fetchData = async () => {
      try {
        const usersCollection = await firestore().collection('Users').get();
        console.log('Total users: ', usersCollection.size);
        usersCollection.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);
};

export default useFirebaseData;
