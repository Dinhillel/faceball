import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HighlightsScreen from './HighlightsScreen';
import ScoreScreen from './ScoreScreen';
import NewsScreen from './NewsScreen';

const Tab = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Highlights" component={HighlightsScreen} />
      <Tab.Screen name="Scores" component={ScoreScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;

