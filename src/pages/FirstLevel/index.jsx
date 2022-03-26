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
  const [nxtBtn , setNxtBtn] = useState(false);

  useEffect(() => {
    setStep(1);
    setSubstep(0);
    setSubLength(2);
    setNumbers(generateArray(1));
  }, []);
 
  useEffect(() => {
    let timeout;

    if (substep < subLength) {
      const timeout = setTimeout(() => {
        setSubstep(substep + 1);
      }, 1000); 
    } else {
      clearTimeout(timeout);
      setNxtBtn(false);
    }

    return clearTimeout(timeout);
  }, [substep]);

  let maxCount = 10;

  function setAnimationConstraints(){
    switch(step){
      case 0:
        setSubLength(1);
        break;
      case 1:
        setSubLength(3);
        setSubstep(0);
        break;
      case 2:
        setSubLength(8);
        setSubstep(2);
        break;
      case 3:
        setSubLength(16);
        setSubstep(7);
        break;
      case 4:
        setSubLength(26);
        setSubstep(15);
        break;
      case 5:
        setSubLength(35);
        setSubstep(25);
        break;
      case 6:
        setSubLength(39);
        setSubstep(34);
        break;
      case 7:
        setSubLength(41);
        setSubstep(38);
        break;
      default:
        break;
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
              {substep > 0 ? algorithm(2, numbers).left.map((number) => { //.map displays the circles on the screen - after the ? is where it displays/maps the number to the next part
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
              {substep > 3 ? algorithm(3, numbers).left.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 4 ? algorithm(3, numbers).left.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 5 ? algorithm(3, numbers).right.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 6 ? algorithm(3, numbers).right.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null}
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
              {substep > 8 ? algorithm(4, numbers).left.left.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 9 ? algorithm(4, numbers).left.left.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 10 ? algorithm(4, numbers).left.right.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null}
              <View style={{ width: 20 }} />
              {substep > 11 ? algorithm(4, numbers).left.right.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null}
              <View style={{ width: 20 }} />
              {substep > 12 ? algorithm(4, numbers).right.left.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null}
              <View style={{ width: 20 }} />
              {substep > 13 ? algorithm(4, numbers).right.left.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 14 ? algorithm(4, numbers).right.right.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 15 ? algorithm(4, numbers).right.right.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null}
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
              {numbers.slice(0, substep - 15).map((number, index) => {
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
              {substep > 26 ? algorithm(6, numbers).left.left.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 27 ? algorithm(6, numbers).left.left.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null}
              <View style={{ width: 20 }} />
              {substep > 28 ? algorithm(6, numbers).left.right.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 29 ? algorithm(6, numbers).left.right.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null}
              <View style={{ width: 20 }} />
              {substep > 30 ? algorithm(6, numbers).right.left.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null}
              <View style={{ width: 20 }} />
              {substep > 31 ? algorithm(6, numbers).right.left.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null}
              <View style={{ width: 20 }} />
              {substep > 32 ? algorithm(6, numbers).right.right.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null}
              <View style={{ width: 20 }} />
              {substep > 33 ? algorithm(6, numbers).right.right.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null}
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
              {substep > 34 ? algorithm(7, numbers).left.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 35 ? algorithm(7, numbers).left.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 36 ? algorithm(7, numbers).right.left.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 37 ? algorithm(7, numbers).right.right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
            </View>
          </>
        ) : null}
        {step > 7 ? ( //- this is when merging starts
          <>
            <View style={{ height: 20 }} />
            <Text style={{ width: "60%", textAlign: "center" }}>
              {Data.Level1["7"]}
            </Text>
            <View style={{ height: 20 }} />
            <View style={{ flexDirection: "row" }}> 
              {substep > 39 ? algorithm(8, numbers).left.map((number) => { //substeps 34 and 35 get merged into subset 39 
                return <NumberInput value={number} editable={false} />;
              }): null }
              <View style={{ width: 20 }} />
              {substep > 40 ? algorithm(8, numbers).right.map((number) => {
                return <NumberInput value={number} editable={false} />;
              }): null }
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
          disabled = {nxtBtn}
          title="Next Step"
          onPress={() => {
            setNxtBtn(true);
            setStep(step + 1);
            setAnimationConstraints();
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
