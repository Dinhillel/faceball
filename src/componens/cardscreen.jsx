import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { useTheme } from 'react-native-paper';

const HighlightCard = ({ item, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.primary }]}
      onPress={() => onPress(item)}
    >
      <Video
        source={{ uri: item.videoUrl }}
        style={styles.thumbnailVideo}
        paused={true}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={[styles.username, { color: colors.text }]}>{item.username}</Text>
        <Text style={[styles.description, { color: colors.text }]} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    borderWidth: 2,
  },
  thumbnailVideo: {
    width: '100%',
    height: 250,
  },
  cardContent: {
    padding: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
  },
});

export default HighlightCard;
