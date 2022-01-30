import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-web';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to First Level"
        onPress={() => {navigation.navigate('FirstLevel', {
            numbers: generateRandomNumbers(1),
          })
        }}
      />
    </View>
  );
}

function Level1({ route, navigation }) {
  const { numbers } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> First Level</Text>
      <Text>Numbers: {JSON.stringify(numbers)}</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FirstLevel" component={Level1} />
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

function generateRandomNumbers(level){
  var arr = [];

  if (level==1 || level==2 || level==3){
    while(arr.length < 10){
      var r = Math.floor(Math.random() * 20) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
  }
  }
  else if (level==4) {
    while(arr.length < 20){
      var r = Math.floor(Math.random() * 50) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
  }
  }
  else if (level==5) {
    while(arr.length < 50){
      var r = Math.floor(Math.random() * 100) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
  }
  }
  return arr;
}


