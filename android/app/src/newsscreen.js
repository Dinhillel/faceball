import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { getDatabase, ref, push, set } from 'firebase/database';
import { firebase } from '@react-native-firebase/app';
import {  NEWS_API_KEY, NEWS_API_HOST } from '@env'; // Import the news Api 
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://nba-latest-news.p.rapidapi.com/articles',
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': process.env.RAPIDAPI_HOST
  }
};
    

function NewsScreen() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(Api);
        if (response.data.articles) {
          const articles = response.data.articles.map(article => ({
            headline: article.title,
            description: article.description,
            URL: article.url,
          }));
          setNews(articles); // Show the data on screen
          saveToFirebase(articles); // Save the data to firebase
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const saveToFirebase = (articles) => {
    const db = getDatabase(firebase.app());
    const newsRef = ref(db, 'news');

    articles.forEach(article => {
      const newArticleRef = push(newsRef);
      set(newArticleRef, article);
    });
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.headline}>{item.headline}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>News</Text>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  screenTitle: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1c1c1c',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  headline: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});

export default NewsScreen;