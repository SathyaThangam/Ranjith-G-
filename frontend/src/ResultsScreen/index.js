import React from 'react';
import RestaurantComp from './RestaurantComp';

const ResultsScreen = ({route}) => {
  return <RestaurantComp data={route.params.data} />;
};

export default ResultsScreen;
