import React from 'react';
import { Button, Text, View } from 'react-native';
import NumberInput from '../../components/NumberInput';

function FirstLevelScreen({ route, navigation }) {
  const { numbers } = route.params;

  let maxNumber = 10;

  const algorithm = (numbers) => {
    return {
      left: numbers.slice(0, maxNumber / 2),
      right: numbers.slice(maxNumber / 2, maxNumber)
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* First step numbers */}
      <View style={{ flexDirection: 'row' }}>
        {numbers.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>
      {/* First step description */}
      <Text>Step 1: Randomly generate 10 numbers ranging from 1 to 20</Text>
      {/* Second step numbers */}
      <View style={{ flexDirection: 'row' }}>
        {algorithm(numbers).left.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {algorithm(numbers).right.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>
      {/* Second step description */}
      <Text>Step 2: Randomly generate 10 numbers ranging from 1 to 20</Text>
      {/* Second step numbers */}
      <View style={{ flexDirection: 'row' }}>
        {algorithm(numbers).left.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {algorithm(numbers).right.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>
      {/* Second step description */}
      <Text>Step 2: Randomly generate 10 numbers ranging from 1 to 20</Text>

      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />

      <Button 
      title="Next Level"
        onPress={() => {
          navigation.navigate('SecondLevel', {
            numbers: [1,2,3,4,5,6,7,8,9,10],
          })
        }}
      />
    </View>
  );
}

export default FirstLevelScreen