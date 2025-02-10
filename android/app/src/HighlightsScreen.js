import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { getdatabase, ref, get, getDatabase } from "firebase/database";
import {firebase} from  '@react-native-firebase/app';
import video from 'react-native-video'; 


const HighlightsScreen =() => {
    const [Highlights setHighlights] = useState([]);
    const [currenttime, setCurrentTime] = useState(0); //current time of the video


    useeffect (() => {
        const db = getDatabase(firebase.app());
        const highlitsref =ref (db, "highlights");

        get(highlightsref)
        .then (DataSnapshot => {
            if (DataSnapshot.exists()) {
                setHighlights(object.values (DataSnapshot.val()));
            } else {
                console.log ("no data available");
              } 
              .catch (error=>{}


            }    

}