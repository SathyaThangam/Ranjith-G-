import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

const OptionItem = ({image, title}) => {
  return (
    <TouchableNativeFeedback>
      <View style={styles.optionItem}>
        <Image source={image} style={styles.optionImg} />
        <Text style={styles.optionTitle}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  optionItem: {
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
  },
  optionImg: {
    height: 150,
    width: '100%',
    flexDirection: 'row',
    resizeMode: 'stretch',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  optionTitle: {
    fontSize: 18,
    alignSelf: 'center',
    paddingVertical: 10,
    color: 'black',
  },
});

export default OptionItem;
