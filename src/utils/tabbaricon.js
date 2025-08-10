//display icons for the tab bar;
import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const TabBarIcon = (route) => {
  const iconName = useMemo(() => {
    switch (route.name) {
      case 'Highlights':
        return 'home';
      case 'Scores':
        return 'scoreboard';
      case 'News':
        return 'newspaper';
      default:
        return 'help-circle';
    }
  }, [route.name]);

  return <Icon name={iconName} size={30} color="white" />;
};
