// entryscreen.js when app starts
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const CustomSplash = () => {
  useEffect(() => {
    
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>faceball</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff', 
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default CustomSplash;
