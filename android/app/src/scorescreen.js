import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';
import { firebase } from '@react-native-firebase/app';

const ScoreScreen = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const db = getDatabase(firebase.app());
    const scoresRef = ref(db, 'scores');
    
    get(scoresRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          setScores(Object.values(snapshot.val()));
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
      <Text style={styles.screenTitle}>NBA Scores</Text>
      <FlatList
        data={scores}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>{item.team1} vs {item.team2}: {item.score}</Text>
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

export default ScoreScreen;