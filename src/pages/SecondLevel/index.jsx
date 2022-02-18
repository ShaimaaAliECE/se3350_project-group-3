import React, { useEffect, useState } from "react";
import { Button, Text, View, ScrollView } from "react-native";
import NumberInput from "../../components/NumberInput";
import "../../Algorithms/MergeSort";
import Data from "../../config/steps.json";
import { TouchableOpacity } from "react-native-web";

const {
  generateArray,
  merge,
  splitArray,
} = require("../../Algorithms/MergeSort");

let arr = new Array();
arr[0] = generateArray(2);

function SecondLevelScreen({ route, navigation }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    console.log(step);
    for (let i = 1; i < step; i++) {
      if (i > 5) {
        break;
      } else if (i == 1) {
        arr[1] = split(arr, 1);

        let newArr = [...blankArr];
        newArr[1] = split(newArr, 1);
        setBlankArr([...newArr]);
      } else {
        arr[i] = split(arr[i - 1], i);
        let newArr = [...blankArr];
        newArr[i] = split(newArr[i - 1], i).map((a) => null);
        setBlankArr([...newArr]);
      }
    }

    if (step > 5) {
      for (let i = 5; i <= step - 1; i++) {
        arr[i] = merged(arr[i - 1], i);
        let newArr = [...blankArr];
        newArr[i] = merged(newArr[i - 1], i).map((a) => null);
        setBlankArr([...newArr]);
      }
    }
  }, [step]);

  const [blankArr, setBlankArr] = useState([]);

  useEffect(() => {
    setBlankArr((prev) => {
      let newArr = [...prev];
      newArr[0] = arr[0].map((a) => null);
      return newArr;
    });
  }, []);

  const [selectedIndex, setSelectedIndex] = useState({});

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

    return object.flat();
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

    return object;
  }

  function generateSplitAlgorithm() {
    let components = [];

            </View>
          );
        }
      }

    return components;
  }

  function generateMergeAlgorithm() {
    let components = [];

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
          {mapNumberInput(blankArr[j][k], j, k)}
        </View>
      );
    }

    return components;
  }

  function mapNumberInput(arr, j, k) {
    console.log(arr);
    return arr.map((number, index) => (
      <TouchableOpacity onPress={() => onPressNumberInput(j, k, index)}>
        <View style={{ flexDirection: "row" }}>
          <NumberInput
            value={number}
            editable={false}
            isSelected={
              j == selectedIndex.j &&
              k == selectedIndex.k &&
              index == selectedIndex.i
            }
          />
        </View>
      </TouchableOpacity>
    ));
  }

  function onPressNumberInput(j, k, i) {
    console.log(blankArr);

    if (Object.keys(selectedIndex).length != 0) {
      let sJ = selectedIndex.j;
      let sK = selectedIndex.k;
      let sI = selectedIndex.i;

      let selectedNumber;

      if (j == 0) {
        selectedNumber = arr[j][i];
      } else {
        selectedNumber = blankArr[j][k][i];
      }

      setBlankArr((prev) => {
        let newArr = [...prev];
        newArr[sJ][sK][sI] = selectedNumber;
        return newArr;
      });
      setSelectedIndex({});
    } else {
      setSelectedIndex({ j, k, i });
    }
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          onPress={() => {
            if (step <= 8) {
              setStep(step + 1);
            }
          }}
        ></Button>
        <View style={{ height: 20 }} />
        {generateSplitAlgorithm()}
        {generateMergeAlgorithm()}
        <View style={{ height: 20 }} />
        <Button title="Go to Home" onPress={() => location.reload()} />
      </View>
    </ScrollView>
  );
}

export default SecondLevelScreen;
