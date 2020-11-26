import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonStyles from '../CommonStyles';
import COLORS from '../ColorConstants';
const PasswordComp = ({children, placeholder, value, onChangeText}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={[CommonStyles.horizontalView, styles.inputContainer]}>
      {children}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
      />
      {value === '' ? null : showPassword ? (
        <MaterialCommunityIcons
          style={{paddingRight: 5}}
          name="eye-off"
          size={25}
          color={COLORS.GREY}
          onPress={() => setShowPassword(false)}
        />
      ) : (
        <MaterialCommunityIcons
          name="eye"
          size={25}
          color={COLORS.GREY}
          onPress={() => setShowPassword(true)}
        />
      )}
      {value === '' ? null : (
        <MaterialCommunityIcons
          name="close"
          size={25}
          color={COLORS.GREY}
          onPress={() => onChangeText('')}
        />
      )}
    </View>
  );
};

export default PasswordComp;

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
