// newsScreenStyles.js
import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './theme';

const screenWidth = Dimensions.get('window').width;

export const newsStyles = StyleSheet.create({
  newsBlock: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  mainCard: {
    flex: 2,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  mainImage: {
    width: screenWidth * 0.55,
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: colors.text,
  },
  smallCards: {
    flex: 1,
    justifyContent: 'space-between',
  },
  smallCard: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  smallImage: {
    width: screenWidth * 0.35,
    height: 70,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  smallTitle: {
    fontSize: 14,
    fontWeight: '600',
    padding: 8,
    color: colors.text,
  },
  activityIndicator: {
    marginTop: 40,
  },
});
