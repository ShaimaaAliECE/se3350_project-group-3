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
      />
       <View style={{ height: 20 }} />
        <Button
        title="Level 2"
      />
       <View style={{ height: 20 }} />
        <Button
        title="Level 3"
      />
       <View style={{ height: 20 }} />
        <Button
        title="Level 4"
      />
       <View style={{ height: 20 }} />
        <Button
        title="Level 5"
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