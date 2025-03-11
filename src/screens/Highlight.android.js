import React from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import useHighlights from '../../hooks/useHighlights';
import HighlightCard from '../../components/HighlightCard';
import FullScreenVideo from '../../components/FullScreenVideo';

const HighlightsScreen = () => {
  const { highlights, loading, error, selectedVideo, isFullScreen, handleVideoPress, closeFullScreen } = useHighlights();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#ff0000', fontSize: 16 }}>Error loading highlights: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={highlights}
        renderItem={({ item }) => <HighlightCard item={item} onPress={handleVideoPress} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
      <FullScreenVideo selectedVideo={selectedVideo} isFullScreen={isFullScreen} onClose={closeFullScreen} />
    </View>
  );
};

export default HighlightsScreen;
