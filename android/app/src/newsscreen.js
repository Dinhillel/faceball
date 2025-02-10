import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';
import { firebase } from '@react-native-firebase/app';

const NewsScreen = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const db = getDatabase(firebase.app());
    const newsRef = ref(db, 'news');
    
    get(newsRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          setNews(Object.values(snapshot.val()));
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Sports News</Text>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>{item.headline}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  screenTitle: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  itemText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 5,
  },
});

export default NewsScreen;
