import React, { useEffect, useState } from "react";
import { Button, Text, View, ScrollView } from "react-native";
import NumberInput from "../../components/NumberInput";
import "../../Algorithms/MergeSort";
import Data from "../../config/steps.json";

const {
  generateArray,
  merge,
  splitArray,
} = require("../../Algorithms/MergeSort");

const arr = new Array();
arr[0] = generateArray(2);

function SecondLevelScreen({ route, navigation }) {
  const [step, setStep] = useState(1);

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

    for (let i = 1; i < step; i++) {
      if(i > 5) {
        break;
      }
      else if (i == 1) {
        split(arr, 1);
      } else {
        split(arr[i - 1], i);
      }
    }

    for (let j = 0; j < arr.length; j++) {
      if (j>4) {
        break;
      }
      if (j == 0) {
        components.push(
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
              {mapNumberInput(arr[j])}
            </View>
            <Text style={{ width: "60%", textAlign: "center" }}>
              {Data.Level2[`${j}`]}
            </Text>
          </View>
        );
      } else {
        components.push(
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
              {mapSegment(j, arr[j].length)}
            </View>
            <Text style={{ width: "60%", textAlign: "center" }}>
              {Data.Level2[`${j}`]}
            </Text>
          </View>
        );
      }
    }

    return components;
  }

  function generateMergeAlgorithm() {
    let components = [];
    if(step > 5){
      for (let i = 5; i <= step-1; i++) {
        merged(arr[i - 1], i);
      }
    }
  
    for (let j = 5; j < arr.length; j++) {
      console.log(arr[j].length);
      components.push(
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            {mapSegment(j, arr[j].length)}
          </View>
          <Text style={{ width: "60%", textAlign: "center" }}>
            {Data.Level2[`${j}`]}
          </Text>
        </View>
      );
    }

    return components;
  }

  function mapSegment(j, max) {
    let components = [];

    for (let k = 0; k < max; k++) {
      components.push(
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 20 }} />
          {mapNumberInput(arr[j][k])}
        </View>
      );
    }

    return components;
  }

  function mapNumberInput(arr) {
    return arr.map((number) => (
      <View style={{ flexDirection: "row" }}>
        <NumberInput value={number} editable={false} />
      </View>
    ));
  }

  return (
    <ScrollView style ={{flex: 1}}>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      <Button onPress={()=>{
        if (step<=8) {
          setStep(step + 1);
        }
      }}>

      </Button>
      {generateSplitAlgorithm()}
      {generateMergeAlgorithm()}

      {console.log(arr)}

      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
    </ScrollView>
  );
}

export default SecondLevelScreen;
