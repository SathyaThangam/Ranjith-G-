import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import HomeScreen from './src/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'ZomatoClone'}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
