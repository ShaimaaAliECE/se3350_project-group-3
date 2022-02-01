import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Select Your Level</Text>
      <Button
        title="Merge Sort Levels"
        onPress={() => {
          navigation.navigate('MergeSortLevels')
        }}
      />
    </View>
  );
}

export default HomeScreen;