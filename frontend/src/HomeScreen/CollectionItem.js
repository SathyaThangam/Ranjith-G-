import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native';

const CollectionItem = ({image, title, subTitle}) => {
  return (
    <TouchableNativeFeedback>
      <ImageBackground style={styles.item} borderRadius={8} source={image}>
        <View style={styles.titleBg}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{subTitle}</Text>
        </View>
      </ImageBackground>
    </TouchableNativeFeedback>
  );
};

export default CollectionItem;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 300,
    marginHorizontal: 10,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 1.5,
  },
  titleBg: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
  },
});
