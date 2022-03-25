import React from 'react';
import { View, Text, Button } from 'react-native';


function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 200}}>
          
      <Text style={{ fontSize: 25 }}>Please select an algorithm</Text>
      <View style={{ height: 120 }} />

      <View style={{ flexDirection: 'row' }}>
        {/* Creating buttons on homepage to guide user to the algorithm they'd like*/}
        <Button
          title="Merge Sort Algorithm"
          onPress={() => {
            navigation.navigate('MergeSortLevels')
          }}
        />
        <View style={{ width: 30 }} />
        <Button
          title="Quick Sort Algorithm"
          onPress={() => {
            navigation.navigate('QuickSortLevels')
          }}
        />
        <Button
          title="User Data"
          onPress={() => {
            navigation.navigate('UserData')
          }}
        />
        
      </View>

    </View>


  );
}

export default HomeScreen;