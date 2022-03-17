import React from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';

let colorFeedback = ["#25C112","#C22A25", "#128CC1"];
let correct = 2;

function MergeSortLevels({ navigation }) {
  const [sound, setSound] = React.useState();
  const [levelTwo, setLevelTwo] = useState(true)
  const [levelThree, setLevelThree] = useState(true)
  const [levelFour, setLevelFour] = useState(true)

  const [levelSelect, setLevelSelect] = useState (1)
  

    setLevelSelect(props.level) 
    
  function setDisabled(levelSelect){
    switch(levelSelect){
      case 2: setLevelTwo(false); break;
      case 3: setLevelTwo(false); setLevelThree(false); break;
      case 4: setLevelTwo(false); setLevelThree(false); setLevelFour(false); break;
    }
  }

  async function playCorrectFeedback() {
    correct = 0;
    const { sound } = await Audio.Sound.createAsync(
       require('../../../assets/correct.mp3')
    );
    setSound(sound);
    await sound.playAsync(); 
  }

  async function playIncorrectFeedback() {
    correct = 1;
    const { sound } = await Audio.Sound.createAsync(
       require('../../../assets/incorrect.mp3')
    );
    setSound(sound);
    await sound.playAsync(); 
  }

  function returnToBlue() {
    correct = 2;
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
      {setDisabled()}
      <Button 
        title="Level 1"
        onPress={() => {
          navigation.navigate('FirstLevel')
        }}
      />
       <View style={{ height: 20 }} />
        <Button 
        title="Level 2"
        disabled={levelTwo}
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
        <Button 
        title="Level 4"
        onPress={async() => {
          if (correct == 1 || correct == 2) {
            playCorrectFeedback()
          }
          else if (correct == 0) {
            playIncorrectFeedback()
          }}}
        color= {colorFeedback[correct]}
      />
       <View style={{ height: 20}} />
        <Button
        title="Level 5"
        onPress={() => {
          navigation.navigate('FifthLevel')
        }}
        
      />
       <View style={{ height: 20 }} />
      <Button color="#128CC1"
        title="Home"
        onPress={() => {
          returnToBlue();
          navigation.navigate('Home');
        }}
      />
       <View style={{ height: 20 }} />
    </View>
    
  );
}
export default MergeSortLevels;