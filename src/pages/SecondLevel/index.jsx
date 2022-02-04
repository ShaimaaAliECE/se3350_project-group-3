import React from 'react';
import { Button, Text, View } from 'react-native';
import NumberInput from '../../components/NumberInput';
import '../../Algorithms/MergeSort'

const {generateArray, merge, splitArray} = require('../../Algorithms/MergeSort');
const arr = new Array();
const numbers = generateArray(10,20);

function display (array) {
    let j = 0
    for(let i=1;i<=5;i++){

        array[i] = splitArray(array[i-1][j])
            if(j>=1)
                j==0
        
    }
    return array


}




function SecondLevelScreen({ route, navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* First step numbers */}
      <View style={{ flexDirection: 'row' }}> 
    
      {numbers.map((arr) => {
          return (
            <NumberInput value={arr} editable={false} />
          )
        })}
      </View>
      {/* First step description */}
      <Text>This is the second level</Text>
      <View style={{ width: 20 }} />
      {/* Second step numbers */}
      {arr[0]=splitArray(numbers)}
      <View style={{ flexDirection: 'row' }}>
        {arr[0][0].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
        <View style={{ width: 20 }} />
        {arr[0][1].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
      </View>        
        {arr[1]= splitArray(arr[0][0])}
        {arr[2]= splitArray(arr[0][1])}

      <View style={{ flexDirection: 'row' }}>
        {arr[1][0].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
        <View style={{ width: 20 }} />
        {arr[1][1].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
        <View style={{ width: 40 }} />
        {arr[2][0].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
        <View style={{ width: 20 }} />
        {arr[2][1].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
      </View>
        {arr[3]=splitArray(arr[1][0])}
        {arr[4]=splitArray(arr[1][1])}
        {arr[5]=splitArray(arr[2][0])}
        {arr[6]=splitArray(arr[2][1])}
        <View style={{ flexDirection: 'row' }}>
        {arr[3][0].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
        <View style={{ width: 20 }} />
        {arr[3][1].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
        <View style={{ width: 40 }} />
        {arr[4][0].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
        <View style={{ width: 20 }} />
        {arr[4][1].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
        <View style={{ width: 40 }} />
        {arr[5][0].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
        <View style={{ width: 20 }} />
        {arr[5][1].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
        <View style={{ width: 40 }} />
        {arr[6][0].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
        <View style={{ width: 20 }} />
        {arr[6][1].map((number) => {
            return (
            <NumberInput value ={number} editable={false}/>
            )
        })}
      </View>
    




      
      {/* Second step description */}
      <Text>Step 2: Randomly generate 10 numbers ranging from 1 to 20</Text>
      {/* Second step numbers */}
      
      {/* Second step description */}
      <Text>Step 2: Randomly generate 10 numbers ranging from 1 to 20</Text>

      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

export default SecondLevelScreen