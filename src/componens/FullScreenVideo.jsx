import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const FullScreenVideo = ({ selectedVideo, isFullScreen, onClose }) => {
  if (!selectedVideo) {
    return null;
  }

  return (
    <Modal visible={isFullScreen} animationType="slide" onRequestClose={onClose}>
      <View style={styles.fullScreenContainer}>
        <Video source={{ uri: selectedVideo.videoUrl }} style={styles.fullScreenVideo} paused={false} resizeMode="cover" repeat />
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.bottomOverlay}>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{selectedVideo.username}</Text>
              <Text style={styles.description}>{selectedVideo.description}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: { flex: 1, backgroundColor: '#000' },
  fullScreenVideo: { ...StyleSheet.absoluteFillObject },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  closeButton: { position: 'absolute', top: 40, right: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 20 },
  closeButtonText: { color: '#fff', fontSize: 20 },
  bottomOverlay: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  userInfo: { color: '#fff', fontSize: 16 },
  username: { fontWeight: 'bold' },
  description: { color: '#ccc' },
});

export default FullScreenVideo;
