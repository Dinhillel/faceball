import firestore from '@react-native-firebase/firestore';

const usercollection = firestore().collection('users');

// function to add new document
async function adduser(userdata) {
  try {
    const docref = await usercollection.add({
      ...userdata,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    console.log('User added with ID:', docref.id);
    return docref.id;
  } catch (error) {
    console.error('Error in adding user:', error);
  }
}

// function to get all users
const getusers = async () => {
  try {
    const querySnapshot = await usercollection.get();
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    console.error('Error in getting users:', error);
  }
};

// function to update userdata
const updateuser = async (userid, newdata) => {
  try {
    await usercollection.doc(userid).update(newdata);
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error in updating user:', error);
  }
};

// function to delete user
const deleteuser = async (userid) => {
  try {
    await usercollection.doc(userid).delete();
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error in deleting user:', error);
  }
};

// Example usage of adduser function
adduser({ name: 'John Doe', email: 'john.doe@example.com' });

// Example usage of getusers function
getusers().then(users => console.log(users));

// Example usage of updateuser function
updateuser('some-user-id', { name: 'Jane Doe' });
