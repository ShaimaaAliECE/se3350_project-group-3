import React from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';

let colorFeedback = ["#128CC1", "#128CC1"];
function MergeSortLevels({ navigation }) {
  const [sound, setSound] = React.useState();

  async function playCorrectFeedback() {
    colorFeedback[0] = "#25C112";
    const { sound } = await Audio.Sound.createAsync(
       require('../../../assets/correct.mp3')
    );
    setSound(sound);
    await sound.playAsync(); 
  }

  async function playIncorrectFeedback() {
    colorFeedback[1] = "#C22A25";
    const { sound } = await Audio.Sound.createAsync(
       require('../../../assets/incorrect.mp3')
    );
    setSound(sound);
    await sound.playAsync(); 
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Merge Sort Levels</Text>
      <View style={{ height: 20 }} />
      <Button 
        title="Level 1"
        onPress={() => {
          navigation.navigate('FirstLevel')
        }}
      />
       <View style={{ height: 20 }} />
        <Button 
        title="Level 2"
        onPress={() => {
          navigation.navigate('SecondLevel')
        }}
      />
       <View style={{ height: 20 }} />
        <Button
        title="Level 3"
        onPress={() => {
          navigation.navigate('ThirdLevel')
        }}
      />
       <View style={{ height: 20 }} />
        <Button color= {colorFeedback[0]}
        title="Level 4"
        onPress={playCorrectFeedback}
      />
       <View style={{ height: 20}} />
        <Button color= {colorFeedback[1]}
        title="Level 5"
        onPress={playIncorrectFeedback}
      />
       <View style={{ height: 20 }} />
      <Button color="#128CC1"
        title="Home"
        onPress={() => {
          navigation.navigate('Home')
        }}
      />
       <View style={{ height: 20 }} />
    </View>
    
  );
}
export default MergeSortLevels;