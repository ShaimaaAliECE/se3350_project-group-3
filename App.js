import { useState, createContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-web';
import SignUp from './src/pages/Login/signUp';
import HomeScreen from './src/pages/Home';
import FirstLevelScreen from './src/pages/FirstLevel';
import MergeSortLevels from './src/pages/mergeSortLevels';
import QuickSortLevels from './src/pages/QuickSortLevels';
import LoginScreen from './src/pages/Login';
import SecondLevelScreen from './src/pages/SecondLevel';
import ThirdLevelScreen from './src/pages/ThirdLevel';
import UserData from './src/pages/Analytics/userData';

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
        numOfAttempts: 0
      },
      {
        level: 2,
        enabled: true,
        timeSpent: 0,
        numOfMistakes: 0,
        numOfAttempts: 0
      },
      {
        level: 3,
        enabled: true,
        timeSpent: 0,
        numOfMistakes: 0,
        numOfAttempts: 0
      },
      {
        level: 4,
        enabled: true,
        timeSpent: 0,
        numOfMistakes: 0,
        numOfAttempts: 0
      },
      {
        level: 5,
        enabled: true,
        timeSpent: 0,
        numOfMistakes: 0,
        numOfAttempts: 0
      }
    ]
  );

  const addUser = (username) => {
    setUser(username)
  }

  const configureLevel = (level, enabled) => {
    setLevels(
      prev => {
        const newLevels = [...prev];
        const index = newLevels.findIndex((n) => n.level == level);

        if (index !== -1) {
          newLevels[index].enabled = enabled;
        }

        return newLevels;
      }
    )
  }

  const addTime = (level, time) => {
    setLevels(
      prev => {
        const newLevels = [...prev];
        const index = newLevels.findIndex((n) => n.level == level);

        if (index !== -1) {
          newLevels[index].timeSpent += time;
        }

        return newLevels;
      }
    )
  }

  const addMistake = (level) => {
    setLevels(
      prev => {
        const newLevels = [...prev];
        const index = newLevels.findIndex((n) => n.level == level);

        if (index !== -1) {
          newLevels[index].numOfMistakes += 1;
        }

        return newLevels;
      }
    )
  }

  const addAttempt = (level) => {
    setLevels(
      prev => {
        const newLevels = [...prev];
        const index = newLevels.findIndex((n) => n.level == level);

        if (index !== -1) {
          newLevels[index].numOfAttempts += 1;
        }

        return newLevels;
      }
    )
  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        levels,
        configureLevel,
        addTime,
        addMistake,
        addAttempt,
        addUser
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp"
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
          <Stack.Screen name="SignUp" component={SignUp}/>
          <Stack.Screen name="UserData" component={UserData}/>
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
