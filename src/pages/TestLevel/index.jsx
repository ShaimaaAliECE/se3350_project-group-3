import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import NumberInput from '../../components/NumberInput';
import '../../Algorithms/MergeSort'
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Gesture, GestureHandlerRootView, GestureDetector } from 'react-native-gesture-handler';
import { Animated } from 'react-native-web';
const {generateArray, merge, splitArray} = require('../../Algorithms/MergeSort');

function TestScreen({ route, navigation }) {

    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                { translateY: offset.value.y },
                { scale: withSpring(isPressed.value ? 1.2 : 1) },
            ],
            backgroundColor: isPressed.value ? 'yellow' : 'blue',
        };
    });

    //const start = useSharedValue({ x: 0, y: 0 });
    // const gesture = Gesture.Pan()
    // .onBegin(() => {
    //     isPressed.value = true;
    // })
    // .onUpdate((e) => {
    //     offset.value = {
    //     x: e.translationX + start.value.x,
    //     y: e.translationY + start.value.y,
    //     };
    // })
    // .onEnd(() => {
    //     start.value = {
    //     x: offset.value.x,
    //     y: offset.value.y,
    //     };
    // })
    // .onFinalize(() => {
    //     isPressed.value = false;
    // });

    const gesture = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      isPressed.value = true;
    })
    .onChange((e) => {
      'worklet';
      offset.value = {
        x: e.changeX + offset.value.x,
        y: e.changeY + offset.value.y,
      };
    })
    .onFinalize(() => {
      'worklet';
      isPressed.value = false;
    });

  //const [step, setStep] = useState(1)

  const arr = new Array();
  arr[0] = generateArray(10,20);
    

  function split (array, step) {
    let object = new Array();
    let repeat = 0;
    switch(step){
      case 2: repeat = 2; break;
      case 3: repeat = 4; break;
      case 4: repeat = 8; break;
      default: repeat = 1;
    }
  
    for (let i=0; i<repeat; i++){
      object[i] = splitArray(array[i])
    }
    
    arr[step] = object.flat();
    
  }
  
  function merged(array, step) {
    let object = new Array();
    let index = [];
    let length = 1;
    let j=0;

      switch(step){
        case 5: index = [0,4]; length=8; break;
        case 6: index = [0,1,2,3]; length=4; break;
        case 7: index = [0,1]; length = 2; break;
        default: index = [0];
      }

       for(let i =0; i<length; i++){ 
          if(index.includes(i)){
            object[i] = merge(array[j],array[j+1])
            j++
          }else{
            object[i] = array[j]
          }
          j++
    }

      arr[step] = object
  }


  return (
    <GestureHandlerRootView>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    
      <View style={{ flexDirection: 'row' }}> 
        {arr[0].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>

      <View style={{ height: 20 }} />

      {split(arr, 1)}
      
      <GestureDetector gesture={gesture}>
      <Animated.View style={[{ flexDirection: 'row' }, animatedStyles]}> 
        {arr[1][0].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[1][1].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </Animated.View>
      </GestureDetector>
      

      <View style={{ height: 20 }} />

      {split(arr[1], 2)}
      <View style={{ flexDirection: 'row' }}> 
        {arr[2][0].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[2][1].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[2][2].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[2][3].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>

      <View style={{ height: 20 }} />

      {/* {split(arr[2], 3)}
      <View style={{ flexDirection: 'row' }}> 
        {arr[3][0].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[3][1].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[3][2].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[3][3].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[3][4].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[3][5].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[3][6].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[3][7].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>

      <View style={{ height: 20 }} />

      {split(arr[3], 4)}
      <View style={{ flexDirection: 'row' }}> 
        {arr[4][0].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[4][1].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[4][2].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[4][3].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[4][4].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[4][5].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[4][6].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[4][7].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[4][8].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[4][9].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>

      <View style={{ height: 20 }} />

      {merged(arr[4], 5)}
       <View style={{ flexDirection: 'row' }}> 
        {arr[5][0].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[5][1].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[5][2].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[5][3].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[5][4].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[5][5].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[5][6].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[5][7].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>

      <View style={{ height: 20 }} /> 

      {merged(arr[5], 6)}
       <View style={{ flexDirection: 'row' }}> 
        {arr[6][0].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[6][1].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[6][2].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[6][3].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>

      <View style={{ height: 20 }} /> 

       {merged(arr[6], 7)} 


       <View style={{ flexDirection: 'row' }}> 
        {arr[7][0].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
        <View style={{ width: 20 }} />
        {arr[7][1].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })}
      </View>

      <View style={{ height: 20 }} /> 

       {merged(arr[7], 8)} 


       <View style={{ flexDirection: 'row' }}> 
        {arr[8][0].map((number) => {
          return (
            <NumberInput value={number} editable={false} />
          )
        })} 
      </View> */}
       
        {console.log(arr)}

      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
    </GestureHandlerRootView>
  );
}

export default TestScreen