import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

// import styles   
 import { globalStyles, colors } from '../styles/theme';
import { newsStyles as styles } from '../styles/newsScreenStyles';

export default function NewsScreen() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'news')); 
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Article", {
              title: main.title,
              imageUrl: main.image,
              content: main.content,
            })
          }
        >
          <Card style={styles.mainCard}>
            <Image source={{ uri: main.image }} style={styles.mainImage} />
            <Text style={styles.mainTitle}>{main.title}</Text>
          </Card>
        </TouchableOpacity>

        <View style={styles.smallCards}>
          {small1 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Article", {
                  title: small1.title,
                  imageUrl: small1.image,
                  content: small1.content,
                })
              }
            >
              <Card style={styles.smallCard}>
                <Image source={{ uri: small1.image }} style={styles.smallImage} />
                <Text style={styles.smallTitle}>{small1.title}</Text>
              </Card>
            </TouchableOpacity>
          )}
          {small2 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Article", {
                  title: small2.title,
                  imageUrl: small2.image,
                  content: small2.content,
                })
              }
            >
              <Card style={styles.smallCard}>
                <Image source={{ uri: small2.image }} style={styles.smallImage} />
                <Text style={styles.smallTitle}>{small2.title}</Text>
              </Card>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
  return blocks;
};
