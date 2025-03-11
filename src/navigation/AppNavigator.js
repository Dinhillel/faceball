import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HighlightsScreen from '../screens/HighlightsScreen';
import ScoreScreen from '../screens/ScoreScreen';
import NewsScreen from '../screens/NewsScreen';
import { tabBarIcon } from '../utils/tabBarIcons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: { backgroundColor: 'black' },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      tabBarIcon: tabBarIcon(route),
    })}
  >
    <Tab.Screen name="Highlights" component={HighlightsScreen} />
    <Tab.Screen name="Scores" component={ScoreScreen} />
    <Tab.Screen name="News" component={NewsScreen} />
  </Tab.Navigator>
);

export default AppNavigator;
