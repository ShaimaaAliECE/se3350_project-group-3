import React from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function QuickSortLevels({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Quick Sort Levels</Text>
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
        <Button
        title="Level 4"
        onPress={() => {
          navigation.navigate('FourthLevel')
        }}
      />
       <View style={{ height: 20 }} />
        <Button
        title="Level 5"
        onPress={() => {
          navigation.navigate('FifthLevel')
        }}
      />
       <View style={{ height: 20 }} />
      <Button
        title="Home"
        onPress={() => {
          navigation.navigate('Home')
        }}
      />
       <View style={{ height: 20 }} />
    </View>
    
  );
}
export default QuickSortLevels;