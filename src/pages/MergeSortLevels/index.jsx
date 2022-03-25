import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import { GlobalContext } from '../../../App';

let colorFeedback = ["#25C112", "#C22A25", "#128CC1"];
let correct = 2;

//change to true to actually account for the moving along
let permanentLevel2 = false;
let permanentLevel3 = false;
let permanentLevel4 = false;
let permanentLevel5 = false;

function MergeSortLevels({ route, navigation }) {
  let levelTwo, levelThree, levelFour, levelFive;

  if (route.params) {
    levelTwo = route.params.levelTwo
    levelThree = route.params.levelThree
    levelFour = route.params.levelFour
    levelFive = route.params.levelFive
  }

  if (levelTwo != true) {
    permanentLevel2 = false;
  }
  if (levelThree != true) {
    permanentLevel3 = false;
  }
  if (levelFour != true) {
    permanentLevel4 = false;
  }
  if (levelFive != true) {
    permanentLevel5 = false;
  }
  const [sound, setSound] = React.useState();

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
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const { user, levels } = useContext(GlobalContext);

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
        disabled={permanentLevel3}
        onPress={() => {
          navigation.navigate('ThirdLevel')
        }}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Level 4"
        disabled={permanentLevel4}
        onPress={async () => {
          if (correct == 1 || correct == 2) {
            playCorrectFeedback()
          }
          else if (correct == 0) {
            playIncorrectFeedback()
          }
        }}
        color={colorFeedback[correct]}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Level 5"
        disabled={permanentLevel5}
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