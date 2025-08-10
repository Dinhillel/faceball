import React from 'react';
import { Avatar, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const UserImage = ({ userImage, userName }) => {
  const { colors } = useTheme();

  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <Avatar.Image size={100} source={{ uri: userImage }} />
      <Text style={{ color: colors.text }}>{userName}</Text>
    </View>
  );
};

export default UserImage;
