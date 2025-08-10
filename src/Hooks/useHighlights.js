import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHighlights, setSelectedVideo, setFullScreen } from '../redux/actions/highlightsActions';

const useHighlights = () => {
  const dispatch = useDispatch();
  const { highlights, loading, error } = useSelector(state => state.highlights);
  const { selectedVideo, isFullScreen } = useSelector(state => state.highlight);

  useEffect(() => {
    dispatch(fetchHighlights());
  }, [dispatch]);

  const handleVideoPress = (item) => {
    dispatch(setSelectedVideo(item));
    dispatch(setFullScreen(true));
  };

  return {
    highlights,
    loading,
    error,
    selectedVideo,
    isFullScreen,
    handleVideoPress,
    closeFullScreen: () => dispatch(setFullScreen(false))
  };
};

export default useHighlights;
