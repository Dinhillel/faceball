/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useTheme } from 'react-native-paper'; 
import useHighlights from '../../hooks/useHighlights';
import HighlightCard from '../../components/HighlightCard';
import FullScreenVideo from '../../components/FullScreenVideo';

const HighlightsScreen = () => {
  const {
    highlights,
    loading,
    error,
    selectedVideo,
    isFullScreen,
    handleVideoPress,
    closeFullScreen
  } = useHighlights();

  const { colors } = useTheme(); 
  if (loading) {
    return (
       
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <Text style={{ color: colors.error, fontSize: 16 }}>
  Error loading highlights: {error.message}
        </Text>

      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={highlights}
        renderItem={({ item }) => (
          <HighlightCard item={item} onPress={handleVideoPress} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
      />
      <FullScreenVideo
        selectedVideo={selectedVideo}
        isFullScreen={isFullScreen}
        onClose={closeFullScreen}
      />
    </View>
  );
};

export default HighlightsScreen;
