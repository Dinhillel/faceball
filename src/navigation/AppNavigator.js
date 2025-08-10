import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HighlightsScreen from '../screens/HighlightsScreen';
import ScoreScreen from '../screens/ScoreScreen';
import NewsScreen from '../screens/NewsScreen';
import ArticleScreen from '../screens/ArticleScreen';
import MatchDetailsScreen from '../screens/MatchDetailsScreen';

import { tabBarIcon } from '../utils/tabBarIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// function that return tab Navigator
const TabNavigator = () => (
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

// ✅ wrap Tab Navigator inside Stack Navigator
const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Main"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Article" component={ArticleScreen} />
    <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
