import React from 'react';
import { View, Text, Button } from 'react-native';


function HomeScreen({ navigation }) {
  function generateRandomNumbers(level) {
    var arr = [];

    if (level == 1 || level == 2 || level == 3) {
      while (arr.length < 10) {
        var r = Math.floor(Math.random() * 20) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
      }
    }
    else if (level == 4) {
      while (arr.length < 20) {
        var r = Math.floor(Math.random() * 50) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
      }
    }
    else if (level == 5) {
      while (arr.length < 50) {
        var r = Math.floor(Math.random() * 100) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
      }
    }
    return arr;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize:25 }}>Please select an algorithm</Text>
      <View style={{ height: 120 }} />
      <View style={{ flexDirection: 'row' }}>
      {/* Creating buttons on homepage to guide user to the algorithm they'd like*/ }
        <Button
          title="Merge Sort Algorithm"
          onPress={() => {
            navigation.navigate('FirstLevel', {
              numbers: generateRandomNumbers(1),
            })
          }}
        />
        <View style={{ width: 30 }} />
        <Button
          title="Quick Sort Algorithm"
          onPress={() => {
            navigation.navigate('QuickSortLevels', {
              numbers: generateRandomNumbers(1),
            })
          }}
        />
      </View>

    </View>
  );
}

export default HomeScreen;