import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Modal,
    Animated,
} from 'react-native';
import axios from 'axios';
import { ref, get, push, set } from "firebase/database";
import { database } from './services/firebaseConfig';
import Video from 'react-native-video';
import { helloFlow } from './services/GeminiService';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const API_URL = "https://api.example.com/highlights";

const HighlightsScreen = () => {
    const [highlights, setHighlights] = useState([]);
    const [loadingStates, setLoadingStates] = useState({});
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const fetchHighlights = async () => {
            try {
              
                const API_URL = "https://api.example.com/highlights"; 
                const fetchHighlights = async () => {
                    try {
                    
                        const response = await axios.get(API_URL);
                        const apiHighlights = response.data;
                
                        if (!apiHighlights || apiHighlights.length === 0) {
                            console.log("No data available from API");
                            return;
                        }
                
                        //  save into Firebase
                        const highlightsRef = ref(database, "highlights");
                
                        await set(highlightsRef, apiHighlights); // save the data come from API
                
                        setHighlights(apiHighlights);
                    } catch (error) {
                        console.error("Error fetching highlights:", error);
                    }
                };
                
                  useEffect(() => {
                    fetchHighlights();
                }, []); 
                // when is not work 
                const handleVideoError = (error, item) => {
        console.error(`Error loading video ${item.videoUrl}:`, error);
        setLoadingStates(prev => ({
            ...prev,
            [item.videoUrl]: { error: true, loading: false }
        }));
    };
//when is run load the video
    const handleVideoLoad = (item) => {
        setLoadingStates(prev => ({
            ...prev,
            [item.videoUrl]: { error: false, loading: false }
        }));
    };
// when a user click to start
    const handleVideoLoadStart = (item) => {
        setLoadingStates(prev => ({
            ...prev,
            [item.videoUrl]: { error: false, loading: true }
        }));
    };
// when a user want to see in full screen
    const handleVideoPress = (item) => {
        setSelectedVideo(item);
        setIsFullScreen(true);
    };
// when a load 
    const renderHighlightCard = ({ item }) => {
        const loadingState = loadingStates[item.videoUrl] || { loading: true, error: false };

        return (
            <TouchableOpacity 
                style={styles.card} 
                onPress={() => handleVideoPress(item)}
            >
                {loadingState.loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                )}
                
                {loadingState.error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Error loading video</Text>
                    </View>
                ) : (
                    <Video
                        source={{ uri: item.videoUrl }}
                        style={styles.thumbnailVideo}
                        paused={true}
                        resizeMode="cover"
                        onError={(error) => handleVideoError(error, item)}
                        onLoad={() => handleVideoLoad(item)}
                        onLoadStart={() => handleVideoLoadStart(item)}
                    />
                )}
                
                <View style={styles.cardContent}>
                    <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderFullScreenVideo = () => {
        if (!selectedVideo) return null;

        return (
            <Modal
                visible={isFullScreen}
                animationType="slide"
                onRequestClose={() => setIsFullScreen(false)}
            >
                <View style={styles.fullScreenContainer}>
                    <Video
                        source={{ uri: selectedVideo.videoUrl }}
                        style={styles.fullScreenVideo}
                        paused={false}
                        resizeMode="cover"
                        repeat={true}
                    />
                    
                    <View style={styles.overlay}>
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setIsFullScreen(false)}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>

                        <View style={styles.bottomOverlay}>
                            <View style={styles.userInfo}>
                                <Text style={styles.username}>{selectedVideo.username}</Text>
                                <Text style={styles.description}>{selectedVideo.description}</Text>
                            </View>
                            
                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionIcon}>❤️</Text>
                                    <Text style={styles.actionCount}>{selectedVideo.likes || 0}</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionIcon}>💬</Text>
                                    <Text style={styles.actionCount}>{selectedVideo.comments || 0}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const testGemini = async () => {
        try {
            await helloFlow('User');
        } catch (error) {
            console.error('Error with Gemini:', error);
        }
    };

    useEffect(() => {
        testGemini();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={highlights}
                renderItem={renderHighlightCard}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={styles.gridContainer}
            />
            {renderFullScreenVideo()}
        </View>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    gridContainer: {
        padding: 5,
    },
    card: {
        flex: 1,
        margin: 5,
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    thumbnailVideo: {
        width: '100%',
        height: 250,
    },
    cardContent: {
        padding: 10,
    },
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    fullScreenVideo: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    bottomOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    userInfo: {
        flex: 1,
        marginRight: 20,
    },
    username: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        color: '#fff',
        fontSize: 14,
    },
    actions: {
        alignItems: 'center',
    },
    actionButton: {
        alignItems: 'center',
        marginBottom: 15,
    },
    actionIcon: {
        fontSize: 30,
        marginBottom: 5,
    },
    actionCount: {
        color: '#fff',
        fontSize: 12,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default HighlightsScreen;