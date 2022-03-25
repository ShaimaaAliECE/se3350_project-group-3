import React, { useEffect, useState, useContext } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { GlobalContext } from "../../../App";
import NumberInput from "../../components/NumberInput";
import Data from "../../config/steps.json"

const { generateArray } = require("../../Algorithms/MergeSort");

function FirstLevelScreen({ route, navigation }) {
  const [numbers, setNumbers] = useState([]);
  const [step, setStep] = useState(1);
  const [substep, setSubstep] = useState(1);
  const [subLength, setSubLength] = useState(2);
  const [subCount, setSubCount] = useState(2)

  useEffect(() => {
    setStep(1);
    setSubstep(0);
    setSubLength(2);
    setSubCount(0);
    setNumbers(generateArray(1));
  }, []);
 
  useEffect(() => {
    let timeout;

    if (substep < subLength) {
      const timeout = setTimeout(() => {
        setSubstep(substep + 1);
      }, 2000); 
    } else {
      clearTimeout(timeout);
    }

    return clearTimeout(timeout);
  }, [substep]);

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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {mapNumberInput(arr[j])}
          </View>
        );
      } else {
        components.push(
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 20 }} />
          {mapNumberInput(arr[j][k])}
        </View>
      );
    }

    return components;
  }

  function mapNumberInput(arr) {
    return arr.map((number) => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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

  const { enableLevel } = useContext(GlobalContext);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: "center", marginVertical: 60 }}>
        {/* First step numbers */}
        {step > 0 ? (
          <>
            <View style={{ height: 20 }} />
            <Text style={{ width: "60%", textAlign: "center" }}>
              {Data.Level1["0"]}
            </Text>
            <View style={{ height: 20 }} />
            <View style={{ flexDirection: "row" }}>
              {numbers.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
            </View>
          </>
        ) : null}
        {step > 1 ? (
          <>
            <View style={{ height: 20 }} />
            <Text style={{ width: "60%", textAlign: "center" }}>
              {Data.Level1["1"]}
            </Text>
            <View style={{ height: 20 }} />
            <View style={{ flexDirection: "row" }}>
              {substep > 0 ? algorithm(2, numbers).left.map((number) => {
                
                return <NumberInput value={number} editable={false} />;
                }): null }

              <View style={{ width: 20 }} />
              {substep > 1 ? algorithm(2, numbers).right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }

            </View>
          </>
        ) : null}
        {step > 2 ? (
          <>
            <View style={{ height: 20 }} />
            <Text style={{ width: "60%", textAlign: "center" }}>
              {Data.Level1["2"]}
            </Text>
            <View style={{ height: 20 }} />
            <View style={{ flexDirection: "row" }}>
              {algorithm(3, numbers).left.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(3, numbers).left.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(3, numbers).right.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(3, numbers).right.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
            </View>
          </>
        ) : null}
        {step > 3 ? (
          <>
            <View style={{ height: 20 }} />
            <Text style={{ width: "60%", textAlign: "center" }}>
              {Data.Level1["3"]}
            </Text>
            <View style={{ height: 20 }} />

            <View style={{ flexDirection: "row" }}>
              {algorithm(4, numbers).left.left.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(4, numbers).left.left.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(4, numbers).left.right.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(4, numbers).left.right.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(4, numbers).right.left.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(4, numbers).right.left.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(4, numbers).right.right.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(4, numbers).right.right.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
            </View>
          </>
        ) : null}
        {step > 4 ? (
          <>
            <View style={{ height: 20 }} />
            <Text style={{ width: "60%", textAlign: "center" }}>
              {Data.Level1["4"]}
            </Text>
            <View style={{ height: 20 }} />
            <View style={{ flexDirection: "row" }}>
              {numbers.map((number, index) => {
                return (
                  <>
                    <View style={{ width: index == 0 ? 0 : 20 }} />
                    <NumberInput value={number} editable={false} />
                  </>
                );
              })}
            </View>
          </>
        ) : null}
        {step > 5 ? (
          <>
            <View style={{ height: 20 }} />
            <Text style={{ width: "60%", textAlign: "center" }}>
              {Data.Level1["5"]}
            </Text>
            <View style={{ height: 20 }} />
            <View style={{ flexDirection: "row" }}>
              {algorithm(6, numbers).left.left.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(6, numbers).left.left.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(6, numbers).left.right.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(6, numbers).left.right.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(6, numbers).right.left.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(6, numbers).right.left.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(6, numbers).right.right.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(6, numbers).right.right.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
            </View>
          </>
        ) : null}
        {step > 6 ? (
          <>
            <View style={{ height: 20 }} />
            <Text style={{ width: "60%", textAlign: "center" }}>
              {Data.Level1["6"]}
            </Text>
            <View style={{ height: 20 }} />

            <View style={{ flexDirection: "row" }}>
              {algorithm(7, numbers).left.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(7, numbers).left.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(7, numbers).right.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(7, numbers).right.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
            </View>
          </>
        ) : null}
        {step > 7 ? (
          <>
            <View style={{ height: 20 }} />
            <Text style={{ width: "60%", textAlign: "center" }}>
              {Data.Level1["7"]}
            </Text>
            <View style={{ height: 20 }} />
            <View style={{ flexDirection: "row" }}>
              {algorithm(8, numbers).left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
              <View style={{ width: 20 }} />
              {algorithm(8, numbers).right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              })}
            </View>
          </>
        ) : null}
        {step > 8 ? (
          <>
            <View style={{ height: 20 }} />
            <Text style={{ width: "60%", textAlign: "center" }}>
              {Data.Level1["8"]}
            </Text>
            <View style={{ height: 20 }} />
            <View style={{ flexDirection: "row" }}>
              {algorithm(9, numbers).map((number, index) => {
                return <NumberInput value={number} editable={false} />;
              })}
            </View>
          </>
        ) : null}
        <Button
          title="Go to Level Select"
          onPress={() => {
            enableLevel(2);
            navigation.navigate("MergeSortLevels")
          }}
        />

        <Button
          title="Next Step"
          onPress={() => {
            setStep(step + 1)
            setSubstep(subCount);
            }}
        />

        <Button
          title="Next Level"
          onPress={() => {
            enableLevel(2);
            navigation.navigate("SecondLevel");
          }}
        />
      </View>
    </ScrollView>
  );
}

export default FirstLevelScreen;
