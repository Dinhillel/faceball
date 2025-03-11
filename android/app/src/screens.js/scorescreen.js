import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { setScores } from './src/redux/scoresSlice'; 

const ScoreScreen = () => {
  const dispatch = useDispatch();
  const scores = useSelector(state => state.scores.scores); // Redux state

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scoresSnapshot = await firestore().collection('scores').get();
        if (!scoresSnapshot.empty) {
          const scoresList = scoresSnapshot.docs.map(doc => doc.data());
          dispatch(setScores(scoresList)); //send the data-Redux
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, [dispatch]);

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