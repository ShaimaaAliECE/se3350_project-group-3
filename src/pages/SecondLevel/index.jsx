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
          <View>
            <View style={{ flexDirection: "row" }}>{mapNumberInput(arr[j])}</View>
            <Text style={{ width: '60%', textAlign: 'center' }}>Hello</Text>
          </View>
        );
      } else {
        components.push(
          <View>
            <View style={{ flexDirection: "row" }}>
            {mapSegment(j, arr[j].length)}
            </View>
            <Text style={{ width: '60%', textAlign: 'center' }}>Again</Text>
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
      components.push(
        <View>
          <View style={{ flexDirection: "row" }}>
          {mapSegment(j, arr[j].length)}
          </View>
            <Text style={{ width: '60%', textAlign: 'center' }}>There</Text>
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <View style={{ flexDirection: "row" }}>
        {arr[0].map((number) => {
          return <NumberInput value={number} editable={false} />;
        })}
        <View style={{ width: 20 }} />
      </View> */}

      {generateSplitAlgorithm()}
      {generateMergeAlgorithm()}
     
      {/*}
      {split(arr, 1)}
      <View style={{ flexDirection: 'row' }}> 
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
      </View>

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

      {split(arr[2], 3)}
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


<-------------------------------------------------------------------------------------------- Merge Part ------------------------------------------------------------------------------------->


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
      </View> 
      {*/}
      {console.log(arr)}

      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

export default SecondLevelScreen;
