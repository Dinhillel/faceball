import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native'; 
import { Calendar } from 'react-native-calendars';
import { Chip } from 'react-native-paper';
import useGamesLogic from './GamesLogic';

const GameItem = ({ item }) => (
  <View
    style={{
      flexDirection: 'row',
      marginVertical: 5,
      padding: 10,
      backgroundColor: '#1a1a1a',
      borderRadius: 8,
      alignItems: 'center',
    }}
  >
    <Chip
      style={{ marginRight: 10, backgroundColor: #55555bff }}
      textStyle={{ color: 'white' }}
      onPress={() =>
        Alert.alert('Game Details', `${item.homeTeam} vs ${item.awayTeam}`)
      } 
    >
      {item.homeTeam} vs {item.awayTeam}
    </Chip>
    <Text style={{ fontWeight: 'bold', color: 'white' }}>
      {item.homeScore} - {item.awayScore}
    </Text>
  </View>
);

const GamesScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const { games, loading, error } = useGamesLogic(selectedDate);

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: 'black' }}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'green' },
        }}
        theme={{
          calendarBackground: 'black',
          dayTextColor: 'white',
          todayTextColor: 'green',
          monthTextColor: 'white',
          arrowColor: 'white',
          textDisabledColor: '#555',
          selectedDayBackgroundColor: 'green',
          selectedDayTextColor: 'black',
        }}
      />

      {selectedDate && (
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            marginVertical: 10,
            color: 'white',
          }}
        >
          games {selectedDate}
        </Text>
      )}

      {loading && <ActivityIndicator size="large" color="green" />}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {!loading && !error && games.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20, color: 'white' }}>
          no games found for this date
        </Text>
      )}

      {!loading && !error && (
        <FlatList
          data={games}
          renderItem={({ item }) => <GameItem item={item} />}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        />
      )}
    </View>
  );
};

export default GamesScreen;
