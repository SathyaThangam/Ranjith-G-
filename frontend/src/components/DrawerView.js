import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';

const DrawerView = ({children, show}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View style={styles.overlay}>
        <View style={styles.drawerContainer}>{children}</View>
      </View>
    </Modal>
  );
};

export default DrawerView;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  drawerContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    flex: 1,
    padding: 15,
    marginTop: 100,
  },
});
