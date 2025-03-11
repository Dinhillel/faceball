// highlightsActions.js
import { firestore } from '../../firebase'; // תיקיית firebase שלך

// כאן אנחנו מגדירים את סוגי הפעולות
export const FETCH_HIGHLIGHTS_REQUEST = 'FETCH_HIGHLIGHTS_REQUEST';
export const FETCH_HIGHLIGHTS_SUCCESS = 'FETCH_HIGHLIGHTS_SUCCESS';
export const FETCH_HIGHLIGHTS_FAILURE = 'FETCH_HIGHLIGHTS_FAILURE';

// אקשן שמבצע את הקריאה ל-Firestore
export const fetchHighlights = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_HIGHLIGHTS_REQUEST }); // שליחה שהתחלנו את הבקשה
    try {
      // קריאה ל-Firestore
      const snapshot = await firestore.collection('highlights').get();
      const highlights = snapshot.docs.map(doc => doc.data());
      dispatch({ type: FETCH_HIGHLIGHTS_SUCCESS, payload: highlights }); // שליחה אם הצלחנו
    } catch (error) {
      dispatch({ type: FETCH_HIGHLIGHTS_FAILURE, payload: error.message }); // שליחה אם יש שגיאה
    }
  };
};
