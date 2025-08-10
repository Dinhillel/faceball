// GamesLogic.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGamesLogic = (selectedDate) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      fetchGames(selectedDate);
    }
  }, [selectedDate]);

  const fetchGames = async (date) => {
    setLoading(true);
    try {
      const response = await axios.get(`API_URL_TO_FETCH_GAMES/${date}`);
      setGames(response.data);
      setError(null); // reset error if the request is successful
    } catch (error) {
      console.error("Error fetching games:", error);
      setError("Error fetching games");
    } finally {
      setLoading(false);
    }
  };

  return {
    games,
    loading,
    error,
  };
};

export default useGamesLogic;
