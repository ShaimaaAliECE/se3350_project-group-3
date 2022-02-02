import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import NumberInput from '../../components/NumberInput';

function FirstLevelScreen({ route, navigation }) {
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
  
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    setNumbers(generateRandomNumbers(1));
  }, []);

  let maxCount = 10;

  const algorithm = (step, numbers) => {
    if (step == 2) {
      return {
        left: numbers.slice(0, maxCount / 2),
        right: numbers.slice(maxCount / 2, maxCount)
      }
    } else if (step == 3) {
      return {
        left: {
          left: numbers.slice(0, Math.ceil(maxCount / 4)),
          right: numbers.slice(Math.ceil(maxCount / 4), maxCount / 2)
        },
        right: {
          left: numbers.slice(maxCount / 2, maxCount / 2 + Math.ceil(maxCount / 4)),
          right: numbers.slice(maxCount / 2 + Math.ceil(maxCount / 4), maxCount)
        }
      }
    } else if (step == 4) {
      return numbers;
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
      <View style={{ height: 20 }} />
      <Text>Step 1: Randomly generate 10 numbers ranging from 1 to 20</Text>
      {/* Second step numbers */}
      <View style={{ height: 20 }} />
      <View style={{ flexDirection: 'row' }}>
        {algorithm(2, numbers).left.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {algorithm(2, numbers).right.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>
      {/* Second step description */}
      <View style={{ height: 20 }} />
      <Text>Step 2: Randomly generate 10 numbers ranging from 1 to 20</Text>
      {/* Second step numbers */}
      <View style={{ height: 20 }} />
      <View style={{ flexDirection: 'row' }}>
        {algorithm(3, numbers).left.left.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {algorithm(3, numbers).left.right.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {algorithm(3, numbers).right.left.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {algorithm(3, numbers).right.right.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>
      {/* Second step description */}
      <View style={{ height: 20 }} />
      <Text>Step 3: Randomly generate 10 numbers ranging from 1 to 20</Text>

      {/* Second step numbers */}
      <View style={{ height: 20 }} />
      <View style={{ flexDirection: 'row' }}>
        {algorithm(3, numbers).left.left.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {algorithm(3, numbers).left.right.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {algorithm(3, numbers).right.left.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {algorithm(3, numbers).right.right.map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>
      {/* Third step description */}
      <View style={{ height: 20 }} />
      <Text>Step 3: Randomly generate 10 numbers ranging from 1 to 20</Text>

      {/* Second step numbers */}
      <View style={{ height: 20 }} />
      <View style={{ flexDirection: 'row' }}>
        {numbers.map((number, index) => {
          return (
            <>  
              <View style={{ width: index == 0 ? 0 : 20 }} />
              <NumberInput value={number} editable={false} />
            </>
          )
        })}
      </View>
      {/* Second step description */}
      <View style={{ height: 20 }} />
      <Text>Step 3: Randomly generate 10 numbers ranging from 1 to 20</Text>

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