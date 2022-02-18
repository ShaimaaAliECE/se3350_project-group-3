import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import NumberInput from "../../components/NumberInput";
import "../../Algorithms/MergeSort";

const { generateArray } = require("../../Algorithms/MergeSort");

function FirstLevelScreen({ route, navigation }) {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    setNumbers(generateArray(1));
  }, []);

  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout;

    if (step < 10) {
      const timeout = setTimeout(() => {
        setStep(step + 1);
      }, 2000);
    }

    return clearTimeout(timeout);
  }, [step]);

  let maxCount = 10;

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

  const sortNumbers = (a, b) => {
    return a - b;
  };

  const algorithm = (step, numbers) => {
    const halfMaxCount = maxCount / 2;
    const quarterMaxCount = maxCount / 4;
    const eighthMaxCount = maxCount / 8;
    const sixteenthMaxCount = maxCount / 16;

    if (step == 2) {
      return {
        left: numbers.slice(0, halfMaxCount),
        right: numbers.slice(halfMaxCount, maxCount),
      };
    } else if (step == 3) {
      return {
        left: {
          left: numbers.slice(0, quarterMaxCount + 0.5),
          right: numbers.slice(quarterMaxCount + 0.5, halfMaxCount),
        },
        right: {
          left: numbers.slice(
            halfMaxCount,
            halfMaxCount + quarterMaxCount + 0.5
          ),
          right: numbers.slice(halfMaxCount + quarterMaxCount + 0.5, maxCount),
        },
      };
    } else if (step == 4) {
      return {
        left: {
          left: {
            left: numbers.slice(0, 2),
            right: numbers.slice(2, 3),
          },
          right: {
            left: numbers.slice(3, 4),
            right: numbers.slice(4, 5),
          },
        },
        right: {
          left: {
            left: numbers.slice(5, 7),
            right: numbers.slice(7, 8),
          },
          right: {
            left: numbers.slice(8, 9),
            right: numbers.slice(9, 10),
          },
        },
      };
    } else if (step == 5) {
      return numbers;
    } else if (step == 6) {
      return {
        left: {
          left: {
            left: numbers.slice(0, 2).sort(sortNumbers),
            right: numbers.slice(2, 3).sort(sortNumbers),
          },
          right: {
            left: numbers.slice(3, 4).sort(sortNumbers),
            right: numbers.slice(4, 5).sort(sortNumbers),
          },
        },
        right: {
          left: {
            left: numbers.slice(5, 7).sort(sortNumbers),
            right: numbers.slice(7, 8).sort(sortNumbers),
          },
          right: {
            left: numbers.slice(8, 9).sort(sortNumbers),
            right: numbers.slice(9, 10).sort(sortNumbers),
          },
        },
      };
    } else if (step == 7) {
      return {
        left: {
          left: numbers.slice(0, quarterMaxCount + 0.5).sort(sortNumbers),
          right: numbers
            .slice(quarterMaxCount + 0.5, halfMaxCount)
            .sort(sortNumbers),
        },
        right: {
          left: numbers
            .slice(halfMaxCount, halfMaxCount + quarterMaxCount + 0.5)
            .sort(sortNumbers),
          right: numbers
            .slice(halfMaxCount + quarterMaxCount + 0.5, maxCount)
            .sort(sortNumbers),
        },
      };
    } else if (step == 8) {
      return {
        left: numbers.slice(0, halfMaxCount).sort(sortNumbers),
        right: numbers.slice(halfMaxCount, maxCount).sort(sortNumbers),
      };
    } else if (step == 9) {
      return [...numbers].sort(sortNumbers);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: "center", marginVertical: 60 }}>
        {generateSplitAlgorithm()}
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        />

        <Button
          title="Next Level"
          onPress={() => {
            navigation.navigate("SecondLevel", {
              numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            });
          }}
        />
      </View>
    </ScrollView>
  );
}

export default FirstLevelScreen;
