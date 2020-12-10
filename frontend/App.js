import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import HomeScreen from './src/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ResultsScreen from './src/ResultsScreen';
import COLORS from './src/ColorConstants';
import OrdersComp from './src/components/OrdersComp';
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
          <Stack.Screen
            name="Results"
            component={ResultsScreen}
            options={{title: 'ZomatoClone'}}
          />
          <Stack.Screen
            name="Orders"
            component={OrdersComp}
            options={{
              title: 'Your Orders',
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.RED,
              },
              headerTintColor: '#FFF',
            }}
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
