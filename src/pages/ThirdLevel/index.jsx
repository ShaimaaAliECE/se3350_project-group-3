import React, { useEffect, useState } from "react";
import { Button, Text, View, Alert, Modal, StyleSheet, Pressable } from "react-native";
import NumberInput from "../../components/NumberInput";
import "../../Algorithms/MergeSort";
import { AccessModal } from '../Modal';
import { DisplayModal } from '../Modal/displayModal'

const {
  generateArray,
  merge,
  splitArray,
} = require("../../Algorithms/MergeSort");

const arr = new Array();
arr[0] = generateArray(10, 20);

function ThirdLevelScreen({ route, navigation }) {
  const [step, setStep] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState({});
  const [whichModal, setWhichModal] = useState(1);
  const [levelMax, setLevelMax] = useState(10)
  let displayNumbers = true;
  const [option, setOption] = useState([]);

  function isActive() {
    if(modalVisible)
      return true;
    else
      return false;
  }

  function whichDisplay(){
    if(whichModal==1)
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
        if(j==(step-1))
          displayNumbers = false;
        else
          displayNumbers = true
    
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
    console.log(displayNumbers)
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
    return arr.map((number, index) => (
      <View style={{ flexDirection: "row" }}>
        {displayNumbers ?
        <NumberInput key={index} value={number} editable={false} isSelected={index==selectedIndex.index && j==selectedIndex.j && k==selectedIndex.k} onClick={() => { setSelectedIndex({j,k,index})}}/>
        :
        <NumberInput key={index} value={""} editable={false} isSelected={index==selectedIndex.index && j==selectedIndex.j && k==selectedIndex.k} onClick={() => { setSelectedIndex({j,k,index})}}/>
        }
      </View>
    ));
  }

  function next(){
    //setStep(step + 1);
    setOption(options());

    setModalVisible(true)
  }

  function options() {
    let object1=[5,5]
    let object2=[3,7]
    let object3=[2,8]
    return [object1,object2,object3]
  }

  function setArray(array){
    console.log(array[0][0])
    const tempArray =[...array]

    for(let i=0;i<array.length;i++){
      for(let j=0;j<array[i].length;j++){
        
        tempArray[i][j]= " ";
      }
    }

    return tempArray
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      <View style={{ height: 20 }} />
      {generateSplitAlgorithm()}
      <Button title={"NEXT"} onPress={() => next() }/>
      
      {isActive() ? 
        whichDisplay() ?
          <AccessModal close={closeModal} options={option} number={levelMax} />
        :
          <DisplayModal close={closeModal} />
      :
        null
      }

      {console.log(arr)}
      <Pressable style={[{borderRadius: 20,padding: 10,elevation: 2}, {backgroundColor: '#F194FF'}]} onPress={() => setModalVisible(true)}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Check Answer!</Text>
      </Pressable>

      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

export default ThirdLevelScreen;
