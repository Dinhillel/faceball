import React from 'react';
import { Switch, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';


const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  const { colors } = useTheme();

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ color: colors.text }}>מצב כהה/בהיר</Text>
      <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
    </View>
  );
};

export default DarkModeToggle;
