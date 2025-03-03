import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import firebase from '@react-native-firebase/app';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HighlightsScreen from './HighlightsScreen';
import ScoreScreen from './ScoreScreen';
import NewsScreen from './NewsScreen';

const Tab = createBottomTabNavigator();

const tabbaricon = (route) =>({ color, size }) => {
    let iconname;
    if( route.name=== 'Highlights'){
        iconname='home';
    } else if (route.name === 'scores') {
        iconname = 'scorebored';
    } else if (route.name === 'news') {
        iconname = 'newspaper';
    }
     
    return <Icon name={iconname} size={30} color={color} />;
};
const App = () => {
    useEffect(() => {
        console.log("Firebase App Name:", firebase.app().name);
    }, []);
return (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: 'black' },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: tabBarIcon(route)
            })}
        >
            <Tab.Screen name="Highlights" component={HighlightsScreen} />
            <Tab.Screen name="Scores" component={ScoreScreen} />
            <Tab.Screen name="News" component={NewsScreen} />
        </Tab.Navigator>
    </NavigationContainer>
    );
};

export default App;