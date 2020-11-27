import React from 'react';
import {StyleSheet, TextInput, View, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonStyles from '../CommonStyles';
const OutlinedInputComp = ({
  children,
  password,
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <View style={[CommonStyles.horizontalView, styles.inputContainer]}>
      {children}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={password !== undefined}
        value={value}
        onChangeText={onChangeText}
      />
      {value === '' ? null : (
        <MaterialCommunityIcons
          name="close"
          size={20}
          color="#7c7c7c"
          onPress={() => onChangeText('')}
        />
      )}
    </View>
  );
};

export default OutlinedInputComp;

const styles = StyleSheet.create({
  input: {
    flex: 2,
    fontSize: 18,
    paddingLeft: 10,
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgb(156,156,156)',
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
