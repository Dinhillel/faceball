// /screens/NewsScreen.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { globalStyles, colors } from '../styles/globalStyles';

const screenWidth = Dimensions.get('window').width;

export default function NewsScreen() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'news')); // <-- your Firestore collection name
      const fetchedNews = [];
      querySnapshot.forEach(doc => {
        fetchedNews.push({ id: doc.id, ...doc.data() });
      });
      setNewsData(fetchedNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const renderNewsBlocks = () => {
    const blocks = [];
    for (let i = 0; i < newsData.length; i += 3) {
      const main = newsData[i];
      const small1 = newsData[i + 1];
      const small2 = newsData[i + 2];

      blocks.push(
        <View key={main.id} style={styles.newsBlock}>
          <Card style={styles.mainCard}>
            <Image source={{ uri: main.image }} style={styles.mainImage} />
            <Text style={styles.mainTitle}>{main.title}</Text>
          </Card>

          <View style={styles.smallCards}>
            {small1 && (
              <Card style={styles.smallCard}>
                <Image source={{ uri: small1.image }} style={styles.smallImage} />
                <Text style={styles.smallTitle}>{small1.title}</Text>
              </Card>
            )}
            {small2 && (
              <Card style={styles.smallCard}>
                <Image source={{ uri: small2.image }} style={styles.smallImage} />
                <Text style={styles.smallTitle}>{small2.title}</Text>
              </Card>
            )}
          </View>
        </View>
      );
    }
    return blocks;
  };

  return (
<ScrollView style={[globalStyles.container, { backgroundColor: colors.background }]}>
  {loading ? (
    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
  ) : (
    renderNewsBlocks()
  )}
</ScrollView>
  );
}
