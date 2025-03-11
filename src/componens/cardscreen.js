import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

const HighlightCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Video source={{ uri: item.videoUrl }} style={styles.thumbnailVideo} paused={true} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
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
    color: '#555',
  },
});

export default HighlightCard;
