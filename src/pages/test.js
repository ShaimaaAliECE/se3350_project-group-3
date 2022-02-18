import React, { useEffect, useState } from "react";
import { Button, Text, View, Alert, Modal, StyleSheet, Pressable } from "react-native";
import NumberInput from "../../components/NumberInput";
import "../../Algorithms/MergeSort";
import { AccessModal } from '../Modal';

const {
  generateArray,
  merge,
  splitArray,
} = require("../../Algorithms/MergeSort");

const arr = new Array();
arr[0] = generateArray(10, 20);

function SecondLevelScreen({ route, navigation }) {
  const [step, setStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [background, setBackground] = useState("transparent")
  const [selectedIndex, setSelectedIndex] = useState({});
  const [whatStep, setWhatStep] = useState(1)
  const [option, setOption] = useState([])


  function isActive() {
    if(modalVisible)
      return true;
    else
      return false;
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  function select(j, k , i) {
    if(selectedIndex.j == j && selectedIndex.index == i){
      setSelectedIndex(null)
      
    }else{
      console.log("hi")
      setSelectedIndex({j, k, i})
    }
    
  }

  function split(array, step) {
    let object = new Array();
    let repeat = 0;
    switch (step) {
      case 2:
        repeat = 2;
        break;
      case 3:
        repeat = 4;
        break;
      case 4:
        repeat = 8;
        break;
      default:
        repeat = 1;
    }

    for (let i = 0; i < repeat; i++) {
      object[i] = splitArray(array[i]);
    }

    arr[step] = object.flat();
  }

  function merged(array, step) {
    let object = new Array();
    let index = [];
    let length = 1;
    let j = 0;

    switch (step) {
      case 5:
        index = [0, 4];
        length = 8;
        break;
      case 6:
        index = [0, 1, 2, 3];
        length = 4;
        break;
      case 7:
        index = [0, 1];
        length = 2;
        break;
      default:
        index = [0];
    }

    for (let i = 0; i < length; i++) {
      if (index.includes(i)) {
        object[i] = merge(array[j], array[j + 1]);
        j++;
      } else {
        object[i] = array[j];
      }
      j++;
    }

    arr[step] = object;
  }

  function generateSplitAlgorithm() {
    let components = [];

    split(arr, 1);

    for (let i = 1; i < step; i++) {
      if (i == 1) {
        split(arr, 1);
      } else {
        split(arr[i - 1], i);
      }
    }

    for (let j = 0; j < arr.length; j++) {
      console.log(arr[j].length);
      if (j == 0) {
        components.push(
          <View style={{ flexDirection: "row" }}>{mapNumberInput(arr[j])}</View>
        );
      } else {
        components.push(
          <View style={{ flexDirection: "row" }}>
            {mapSegment(j, arr[j].length)}
          </View>
        );
      }
    }

    return components;
  }

  function mapSegment(j, max) {
    let components = [];

    for (let k = 0; k < max; k++) {
      components.push(
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 20 }} />
          {mapNumberInput(arr[j][k], j, k)}
        </View>
      );
    }

    return components;
  }

  function mapNumberInput(arr, j, k) {
    console.log(j+" k "+k)
    return arr.map((number, index) => (
      <View style={{ flexDirection: "row" }}>
        <NumberInput key={index} value={number} editable={false} isSelected={index==selectedIndex.index && j==selectedIndex.j && k==selectedIndex.k} onClick={() => { setSelectedIndex({j,k,index}); options(step, j,k)} }/>
      </View>
    ));
  }

  function options(step,j, k){

    function setChoice(correctL, correctR){
      let left, right =0;
      let choose, option1, option2, option3;
      let max=correctL+correctR
      for(let i=0; i<3; i++){
        if(i==3){
          left = correctL;
          right = correctR;
        }else{
          do{
            left = Math.floor(Math.random() * max+1);
            right = max-left
          }while(left==correctL && right==correctR)
        }
       choose = Math.floor(Math.random() * 3+1);

        if(choose == 1 && option1 == null)
          option1=[left, right]
        else if(choose == 2 && option2 == null)
          option2=[left, right]
        else if(choose == 3 && option3 == null)
          option3=[left, right]

      }
        setOption([option1, option2, option3])
      
    }
    switch(step){
      
      case 1: 
      setOption(setChoice(5, 5));
      break;
      case 2: 
          split=[3,2]
      break;
      case 3: break;
      case 4: break;


    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      <View style={{ height: 20 }} />
      {generateSplitAlgorithm()}
      <Button title={"NEXT"} onPress={() => setStep(step + 1)}/>
      

      {isActive() ? 
      <AccessModal close={closeModal} options={option} />
      :
        null
      }

      {console.log(arr)}
      <Pressable style={[{borderRadius: 20,padding: 10,elevation: 2}, {backgroundColor: '#F194FF'}]} onPress={() => setModalVisible(true)}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Next</Text>
      </Pressable>

      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

export default SecondLevelScreen;









import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';


function NumberInput({ value, setValue, editable, onClick, isSelected} ) {




  return (
    <TextInput style={{width: 40,height: 40,borderRadius: 20,borderWidth: 1,borderColor: 'black', textAlign: 'center', backgroundColor: isSelected ? '#F194FF' : 'transparent'}} 
      onClick={onClick}  
      value={value.toString()}
      onChangeText={setValue}
      editable={editable}
    />
  )
}

export default NumberInput;