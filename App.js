import { useState, createContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-web';

import HomeScreen from './src/pages/Home';
import FirstLevelScreen from './src/pages/FirstLevel';
import MergeSortLevels from './src/pages/mergeSortLevels';
import QuickSortLevels from './src/pages/QuickSortLevels';
import LoginScreen from './src/pages/Login';
import SecondLevelScreen from './src/pages/SecondLevel';
import ThirdLevelScreen from './src/pages/ThirdLevel';

const Stack = createNativeStackNavigator();

export const GlobalContext = createContext({ user: {}, levels: [] });

function App() {
  const [user, setUser] = useState({});
  const [levels, setLevels] = useState(
    [
      {
        level: 1,
        enabled: true,
        timeSpent: 0,
        numOfMistakes: 0,
        numOfAttemps: 0
      },
      {
        level: 2,
        enabled: true,
        timeSpent: 0,
        numOfMistakes: 0,
        numOfAttemps: 0
      },
      {
        level: 3,
        enabled: true,
        timeSpent: 0,
        numOfMistakes: 0,
        numOfAttemps: 0
      },
      {
        level: 4,
        enabled: true,
        timeSpent: 0,
        numOfMistakes: 0,
        numOfAttemps: 0
      },
      {
        level: 5,
        enabled: true,
        timeSpent: 0,
        numOfMistakes: 0,
        numOfAttemps: 0
      }
    ]
  );

  return (
    <GlobalContext.Provider value={{ user, levels }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#800080',
            },
            headerTintColor: '#fff'
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="FirstLevel" component={FirstLevelScreen} />
          <Stack.Screen name="SecondLevel" component={SecondLevelScreen} />
          <Stack.Screen name="ThirdLevel" component={ThirdLevelScreen} />
          {/*<Stack.Screen name="FourthLevel" component={FourthLevelScreen} />
        <Stack.Screen name="FifthLevel" component={FifthLevelScreen} /> */}
          <Stack.Screen name="MergeSortLevels" component={MergeSortLevels} />
          <Stack.Screen name="QuickSortLevels" component={QuickSortLevels} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>

  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
