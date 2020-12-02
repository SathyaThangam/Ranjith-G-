import React from 'react';
import {View} from 'react-native';
import CommonStyles from '../CommonStyles';
import CollectionItem from './CollectionItem';
const CollectionItemList = () => {
  return (
    <View>
      <View style={[CommonStyles.horizontalView, {marginVertical: 10}]}>
        <CollectionItem
          image={require('../img/collection1.jpg')}
          title="Trending this week"
          subTitle="30 Places ▶"
        />
        <CollectionItem
          image={require('../img/collection2.jpg')}
          title="Chennai's Finest"
          subTitle="102 Places ▶"
        />
      </View>
      <View style={[CommonStyles.horizontalView, {marginVertical: 10}]}>
        <CollectionItem
          image={require('../img/collection1.jpg')}
          title="Trending this week"
          subTitle="30 Places ▶"
        />
        <CollectionItem
          image={require('../img/collection2.jpg')}
          title="Chennai's Finest"
          subTitle="102 Places ▶"
        />
      </View>
    </View>
  );
};

export default CollectionItemList;
