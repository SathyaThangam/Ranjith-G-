import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CommonStyles from '../CommonStyles';
const AddButton = ({count, setCount}) => {
  if (count > 0)
    return (
      <View style={[CommonStyles.horizontalView, styles.countContainer]}>
        <Pressable onPress={() => setCount((prev) => prev + 1)}>
          <Text style={styles.textBlocks}>+</Text>
        </Pressable>
        <Text style={styles.textBlocks}>{count}</Text>
        <Pressable onPress={() => setCount((prev) => prev - 1)}>
          <Text style={styles.textBlocks}>-</Text>
        </Pressable>
      </View>
    );
  else
    return (
      <Pressable onPress={() => setCount((prev) => prev + 1)}>
        <View style={[CommonStyles.basicBtn, styles.addBtn]}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Add +</Text>
        </View>
      </Pressable>
    );
};

export default AddButton;

const styles = StyleSheet.create({
  addBtn: {
    borderColor: '#7c7c7c',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  countContainer: {
    borderColor: '#7c7c7c',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    paddingVertical: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 5,
  },
  textBlocks: {
    paddingHorizontal: 10,
    fontSize: 20,
  },
});
