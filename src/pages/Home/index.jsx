import React from 'react';
import { View, Text, Button } from 'react-native';


function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 200}}>
          <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 1000 }} />
          <View style={{ height: 40, }} />
          <Button
            title="Login Here"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
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
        
      </View>

    </View>


  );
}

export default HomeScreen;