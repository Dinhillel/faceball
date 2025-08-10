import React from "react";
import { Text, Image, ScrollView, StyleSheet } from "react-native";
import {styleglobal, colors} from "../styles/theme";
import styles from "../styles/articleScreenStyles"; 

const Articlescreen = ({ route }) => {
  const { title, imageurl, content } = route.params;

  return (
    <ScrollView style={styles.container}>
      {imageurl ? (
        <Image source={{ uri: imageurl }} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
};

export default ArticleScreen;
