import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import NumberInput from "../../components/NumberInput";
import "../../Algorithms/MergeSort";

const {
  generateArray,
  merge,
  splitArray,
} = require("../../Algorithms/MergeSort");

const arr = new Array();
arr[0] = generateArray(10, 20);

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

    split(arr, 1);

    for (let i = 1; i < 5; i++) {
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

  function generateMergeAlgorithm(){
    let components = [];

    for(let i = 5; i <= 8; i++){
      merged(arr[i - 1], i);
    }

    for (let j = 5; j < arr.length; j++) {
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      <Button onPress={()=>{
        //step++;
      }}>

      </Button>
      {generateSplitAlgorithm()}
      {generateMergeAlgorithm()}
     
      {console.log(arr)}

      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

export default SecondLevelScreen;
