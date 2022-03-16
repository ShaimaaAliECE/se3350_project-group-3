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
import SignUp from './src/pages/Login/SignUp';

const Stack = createNativeStackNavigator();

function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#800080',
        },
        headerTintColor: '#fff'
      }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="FirstLevel" component={FirstLevelScreen}/>
        <Stack.Screen name="SecondLevel" component={SecondLevelScreen} />
        <Stack.Screen name="ThirdLevel" component={ThirdLevelScreen} />
        {/*<Stack.Screen name="FourthLevel" component={FourthLevelScreen} />
        <Stack.Screen name="FifthLevel" component={FifthLevelScreen} /> */}
        <Stack.Screen name="MergeSortLevels" component={MergeSortLevels} />
        <Stack.Screen name="QuickSortLevels" component={QuickSortLevels} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
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
