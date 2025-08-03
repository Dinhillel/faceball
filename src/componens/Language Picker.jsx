import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { Text, View, StyleSheet  } from 'react-native';
import { useTheme } from 'react-native-paper';

const LanguagePicker = ({ language, changeLanguage }) => {
  const { colors } = useTheme();

  return (
    <View style={{  marginVertical: 10 }}>
      <Text style={{ color: colors.text }}>choose languge</Text>
      <Picker selectedValue={language} onValueChange={changeLanguage}>
        <Picker.Item label="עברית" value="he" />
        <Picker.Item label="English" value="en" />
      </Picker>
    </View>
  );
};

export default LanguagePicker;
