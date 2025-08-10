import { useEffect, useState } from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const useFirebaseData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = await firestore().collection('Users').get();
        const usersList = usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { users, loading, error };
};

export default useFirebaseData;
