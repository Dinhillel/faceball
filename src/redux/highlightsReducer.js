// highlightsReducer.js
import { FETCH_HIGHLIGHTS_REQUEST, FETCH_HIGHLIGHTS_SUCCESS, FETCH_HIGHLIGHTS_FAILURE } from '../actions/highlightsActions';

const initialState = {
  highlights: [],
  loading: false,
  error: null,
};

const highlightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HIGHLIGHTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_HIGHLIGHTS_SUCCESS:
      return { ...state, loading: false, highlights: action.payload };
    case FETCH_HIGHLIGHTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default highlightsReducer;
