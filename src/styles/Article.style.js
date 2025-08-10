import { StyleSheet } from "react-native";

const articleScreenStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#eee",
  },
});

export default articleScreenStyles;
