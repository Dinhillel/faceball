const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const axios = require("axios");


admin.initializeApp();
const app = express();

const config = functions.config().rapidapi || {};
const apikey = process.env.RAPIDAPI_KEY || config.key;
const apihost = process.env.RAPIDAPI_HOST ||
 config.host ||"sport-news-live.p.rapidapi.com";

 app.get("/fetchNews", async (req, res) => {
  try {
    const apiResponse = await axios.get(`https://${apihost}/articles`, {
      headers: {
        "X-RapidAPI-Key": apikey,
        "X-RapidAPI-Host": apihost,
      },
    });

    const articles = apiResponse.data;

    if (!Array.isArray(articles)) {
      throw new Error("Data returned is not an array");
    }

    const firestore = admin.firestore();
    const batch = firestore.batch();
    const collectionRef = firestore.collection("news");

    articles.forEach((article, index) => {
      const docId = article.id?.toString() || `article_${Date.now()}_${index}`;
      const docRef = collectionRef.doc(docId);

      batch.set(docRef, {
        title: article.title || "",
        summary: article.summary || "",
        url: article.url || "",
        image: article.image || "",
        published: article.published || "",
        source: article.source || "",
      });
    });

    await batch.commit();

    console.log(" Sport news fetched and saved successfully.");
    res.status(200).send(" Sport news fetched and saved successfully.");
  } catch (error) {
    console.error(" Error fetching the sport news:", error.message);
    res.status(500).send(" Failed to fetch/save sport news.");
  }
});                   
exports.scheduledFetchNews = functions.pubsub
  .schedule("every 1 hours")
.onRun(async (context) => {
  try {
  await fetchAndSaveNews();
  console.log("Scheduled news fetch complete");
} catch (error) {
  console.error("Scheduled news fetch failed:", error);
}


// test
app.get("/ping", (req, res) => {
  res.send("API is working!");
});

// export Function
exports.api = functions.https.onRequest(app);