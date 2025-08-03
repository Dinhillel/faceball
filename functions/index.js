const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

// Get RapidAPI key from environment config variable
const RAPIDAPI_KEY = functions.config().rapidapi.key;

exports.getCachedNews = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  try {
    const doc = await admin
        .firestore()
        .collection("newsCache")
        .doc("latest")
        .get();
    if (!doc.exists) {
      return res.status(404).json({error: "No found news"});
    }

    res.status(200).json(doc.data());
  } catch (error) {
    console.error("Error fetching cached news:", error);
    res.status(500).json({error: "Failed to fetch cached news"});
  }
});

exports.updateNewsCache = functions.pubsub.schedule("every 40 minutes").onRun(async () => {
  try {
    const response = await axios.get("https://sport-news-live.p.rapidapi.com/news", {
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "sport-news-live.p.rapidapi.com",
      },
    });

    const news = response.data;

    await admin.firestore().collection("newsCache").doc("latest").set({
      news,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("News cache updated successfully");
    return null;
  } catch (error) {
    console.error("Error updating news cache:", error);
    return null;
  }
});
