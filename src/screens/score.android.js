// GamesScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Chip } from 'react-native-paper';
import useGamesLogic from './GamesLogic';

const GamesScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const { games, loading, error } = useGamesLogic(selectedDate);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* לוח שנה */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' },
        }}
        theme={{
          selectedDayBackgroundColor: 'blue',
          todayTextColor: 'blue',
        }}
      />

      {/* מצב טעינה או שגיאה */}
      {loading && <Text>Loading...</Text>}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {/* הצגת משחקים */}
      {!loading && !error && (
        <FlatList
          data={games}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <Chip style={{ marginRight: 10 }} onPress={() => alert('More details')}>
                {item.homeTeam} vs {item.awayTeam}
              </Chip>
              <Text>
                {item.homeScore} - {item.awayScore}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default GamesScreen;
