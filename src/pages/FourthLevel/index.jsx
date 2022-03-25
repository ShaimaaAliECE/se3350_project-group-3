import React, { useEffect, useState } from "react";
import { Button, Text, View, ScrollView, Image } from "react-native";
import NumberInput from "../../components/NumberInput";
import "../../Algorithms/MergeSort";
import Data from "../../config/steps.json";
import { TouchableOpacity } from "react-native-web";
import { Audio } from "expo-av";
import { StepModal } from "../Modal/stepModal";
import Question from "../../Images/question.png"
import { Verification } from "../Modal/verification";
import { Reset } from "../Modal/resetModal";
import { GlobalContext } from "../../../App";

const {
  generateArray,
  merge,
  splitArray,
} = require("../../Algorithms/MergeSort");

let arr = new Array();
arr[0] = generateArray(4);

function generateEmptyArray(length) {
  let array = [];

  for (let i = 0; i < length; i++) {
    array.push(null);
  }

  return array;
}

function FourthLevelScreen({ route, navigation }) {
  const { enableLevel, addTime, addAttempt, addMistake } = useContext(GlobalContext);

  const [step, setStep] = useState(1);
  const [sound, setSound] = React.useState();
  const [isCorrect, setIsCorrect] = useState(false)
  const [isBubbleCorrect, setIsBubbleCorrect] = useState(false);
  const [resetModalVisible, setResetModalVisble] = useState(false);

  const [secs, setSecs] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const [idleTime, setIdleTime] = useState(300000);
  let idleTimeout;

  useEffect(() => {
    addAttempt(4, 1);
  }, []);

  const setTimeouts = () => {
    idleTimeout = setTimeout(home, idleTime);
  };

  const clearTimeouts = () => {
    if (idleTimeout) {
      clearTimeout(idleTimeout);
    }
  };

  const home = () => {
    navigation.navigate("Home")
  }

  useEffect(() => {
    if (attempt >= 3) {
      setResetModalVisble(true);
      setAttempt(0);
    }
  }, [attempt]);

  useEffect(() => {
    const events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    const resetTimeout = () => {
      clearTimeouts();
      setTimeouts();
    };

    for (let i in events) {
      window.addEventListener(events[i], resetTimeout);
    }

    setTimeouts();
    return () => {
      for (let i in events) {
        window.removeEventListener(events[i], resetTimeout);
        clearTimeouts();
      }
    }
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (!isComplete) {
        setSecs(s => s + 1)
        addTime(1);
      }
      else {
        setSecs(s => s);
      }
    }, 1000)
    return () => clearInterval(timerId);
  }, [isComplete]);

  useEffect(() => {
    setStep(1);
    arr = new Array();
    arr[0] = generateArray(4);
  }, []);

  React.useEffect(() => {
    return sound
      ? () => {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const [modalVisible, setModalVisible] = useState(false);
  const [checkAnswerVisible, setCheckAnswerVisible] = useState(false)
  let displayNumbers = true;

  function resetStates() {
    setAttempt(0);
    setBlankArr((prev) => {
      let newArr = [...prev];
      newArr[0] = arr[0].map((a) => null);
      return newArr;
    });
    setStep(1);
    setSelectedIndex({});
    setCheckAnswerVisible(false);
    setSecs(0);
    setShowBubble(true);
    setSelectableBubles(generateEmptyArray(40));
    addAttempt(1);
    arr = new Array();
    arr[0] = generateArray(4);
    console.log("Array is" + arr[0]);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const closeCheckAnswer = () => {
    setCheckAnswerVisible(false)
    if (isBubbleCorrect) {
      setShowBubble(false);
    }
  }

  function isActive() {
    if (modalVisible)
      return true;
    else
      return false;
  }

  function isResetModalActive() {
    if (resetModalVisible) return true;
    else return false;
  }

  function reset(choice) {
    setResetModalVisble(false);
    switch (choice) {
      case 1:
        resetStates();
        break;
      case 2:
        navigation.navigate("MergeSortLevels", {
          levelFive: (!isComplete)
        });
        break;
      case 3:
        navigation.navigate("Home")
    }
  }

  function displayCheck() {
    if (checkAnswerVisible && attempt != 3) return true;
    else return false;
  }

  useEffect(() => {
    console.log(step);
    for (let i = 1; i < step; i++) {
      if (i > 6) {
        break;
      } else if (i == 1) {
        arr[1] = split(arr, 1);

        let newArr = [...blankArr];
        newArr[1] = split(newArr, 1, true);
        setBlankArr([...newArr]);
      } else {
        arr[i] = split(arr[i - 1], i);
        let newArr = [...blankArr];
        newArr[i] = split(newArr[i - 1], i, true);
        setBlankArr([...newArr]);
      }
    }

    if (step > 6) {
      for (let i = 6; i <= step - 1; i++) {
        arr[i] = merged(arr[i - 1], i);
        let newArr = [...blankArr];
        newArr[i] = merged(newArr[i - 1], i, true);
        setBlankArr([...newArr]);
      }
    }

    setIsCorrect(false);
    setIsBubbleCorrect(false);
  }, [step]);

  const [blankArr, setBlankArr] = useState([]);
  const [showBubble, setShowBubble] = useState(true);
  const [selectableBubbles, setSelectableBubles] = useState(generateEmptyArray(40));

  useEffect(() => {
    setBlankArr((prev) => {
      let newArr = [...prev];
      newArr[0] = arr[0].map((a) => null);
      return newArr;
    });
  }, []);

  const [selectedIndex, setSelectedIndex] = useState({});

  function split(array, step, isBlank) {
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
      case 5:
        repeat = 16;
        break;
      default:
        repeat = 1;
    }

    for (let i = 0; i < repeat; i++) {
      object[i] = splitArray(array[i], isBlank);
    }

    return object.flat();
  }

  function merged(array, step, isBlank) {
    let object = new Array();
    let index = [];
    let length = 1;
    let j = 0;

    switch (step) {
      case 6:
        index = [0, 4, 8, 12];
        length = 16;
        break;
      case 7:
        index = [0, 1, 2, 3, 4, 5, 6, 7];
        length = 8;
        break;
      case 8:
        index = [0, 1, 2, 3];
        length = 4;
        break;
      case 9:
        index = [0, 1];
        length = 2;
        break;
      default:
        index = [0];
    }

    for (let i = 0; i < length; i++) {
      if (index.includes(i)) {
        object[i] = merge(array[j], array[j + 1], isBlank);
        j++;
      } else {
        object[i] = isBlank ? [null] : [...array[j]];
      }
      j++;
    }

    return object;
  }

  function generateSplitAlgorithm() {
    let components = [];
    for (let j = 0; j < arr.length; j++) {
      if (j > 5) {
        break;
      }

      if (j == 0) {
        components.push(
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
              {mapNumberInput(arr[j], j, 0)}
            </View>

          </View>
        );
      } else {
        if (j == step - 1) displayNumbers = false;
        else displayNumbers = true;

        components.push(
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
              {showBubble && j >= step - 1
                ? selectableBubbles.map((sBubble, index) => (
                  <TouchableOpacity onPress={() => onPressEmptyBubble(index)}>
                    <View style={{ flexDirection: "row" }}>
                      <NumberInput
                        value={""}
                        editable={false}
                        isSelected={false}
                        style={{ borderStyle: sBubble ? 'solid' : 'dashed' }}
                      />
                    </View>
                  </TouchableOpacity>))
                : mapSegment(j, blankArr[j] ? blankArr[j].length : 0)}
            </View>
          </View>
        );
      }
    }

    return components;
  }

  function onPressEmptyBubble(i) {
    setSelectableBubles(prev => {
      const newArr = [...prev];
      if (newArr[i] == 1) {
        newArr[i] = null;
      } else {
        newArr[i] = 1;

      }
      return newArr;
    });
  }

  function generateMergeAlgorithm() {
    let components = [];

    for (let j = 6; j < arr.length; j++) {
      console.log(arr[j].length);
      components.push(
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            {showBubble && j >= step - 1
              ? selectableBubbles.map((sBubble, index) => (
                <TouchableOpacity onPress={() => onPressEmptyBubble(index)}>
                  <View style={{ flexDirection: "row" }}>
                    <NumberInput
                      value={""}
                      editable={false}
                      isSelected={false}
                      style={{ borderStyle: sBubble ? 'solid' : 'dashed' }}
                    />
                  </View>
                </TouchableOpacity>))
              : mapSegment(j, blankArr[j] ? blankArr[j].length : 0)
            }
          </View>
        </View>
      );
    }

    return components;
  }

  function mapSegment(j, max) {
    let components = [];
    console.log(displayNumbers);
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
    console.log(j, k, i);

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

  function checkAnswer() {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      let stepArr = arr[i];

      for (let j = 0; j < stepArr.length; j++) {
        let segmentArr = stepArr[j];

        for (let k = 0; k < segmentArr.length; k++) {
          let number = segmentArr[k];

          if (blankArr[i][j][k] == number) {
            count += 1;
          }
        }
      }
    }

    console.log("count: ", count);

    if (!isComplete) {
      if (step != 1 && count == 20 * (step - 1)) {
        if (step >= 11) {
          setIsComplete(true);
        }
        setIsCorrect(true);
        playCorrectFeedback();
      } else {
        setIsCorrect(false);
        let num = attempt;
        setAttempt(num + 1);
        addMistake(1);
        playIncorrectFeedback();
      }
    }
  }

  function checkSplitMergeAnswer() {
    let scantron = [];
    let segment = [];

    for (let i = 0; i < selectableBubbles.length; i++) {
      if (selectableBubbles[i]) {
        segment.push(selectableBubbles[i]);

        if (i == selectableBubbles.length - 1) {
          scantron.push(segment);
        }
      } else {
        if (segment.length) {
          scantron.push(segment);
          segment = [];
        }
      }
    }

    console.log(scantron);

    let tmpIsCorrect = true;

    console.log(arr[step - 1]);

    if (arr[step - 1].length !== scantron.length) {
      tmpIsCorrect = false;
    } else {
      for (let i = 0; i < arr[step - 1].length; i++) {
        if (arr[step - 1][i].length !== scantron[i].length) {
          tmpIsCorrect = false;
        }
      }
    }

    console.log(tmpIsCorrect);

    if (tmpIsCorrect) {
      setIsBubbleCorrect(true);
      playCorrectFeedback();
    } else {
      setIsBubbleCorrect(false);
      let num = attempt;
      setAttempt(num + 1);
      addMistake(1);
      playIncorrectFeedback();
    }
  }

  async function playCorrectFeedback() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/correct.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  async function playIncorrectFeedback() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/incorrect.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 20 }} />
        {generateSplitAlgorithm()}
        {generateMergeAlgorithm()}
        <View style={{ height: 20 }} />
        <Text>Aside from the first step where there are no numbers to fill in, you may not go to the next question unless your answer has been marked correct!</Text>
        <Text>After getting an answer correct, DO NOT try to change the numbers and then go to the next question. You will still see the next question, but will not be able to go to the question after until all errors are fixed!!!</Text>
        <Button
          onPress={() => {
            if (step > 1 && step <= 11) {
              if (!showBubble)
                checkAnswer();
              if (showBubble) checkSplitMergeAnswer();
              setCheckAnswerVisible(true)
            }
          }}
          title={showBubble ? "Check Split/Merge Answer" : "Check Value Answer"}
        />
        {displayCheck() ?
          <Verification close={closeCheckAnswer} success={showBubble ? isBubbleCorrect : isCorrect} />
          :
          null
        }

        {isActive() ?
          <StepModal close={closeModal} data={Data.Level2[`${step - 1}`]} />
          :
          null
        }

        {isResetModalActive() ? <Reset reset={reset} /> : null}

        <Button
          onPress={() => {
            if (step <= 10 && step > 1 && isCorrect) {
              setStep(step + 1);
              setSelectableBubles(generateEmptyArray(40));
              setShowBubble(true);
            }
            else if (step == 1) {
              setStep(step + 1);
            }
          }}
          title="Next Question"
        />
        <Button title="Go to Level Select" onPress={() => {
          if (isComplete) enableLevel(5);
          navigation.navigate("MergeSortLevels")
        }} />
        <Text style={{ fontSize: 40 }}>
          {Math.floor(secs / 60)}:{(secs % 60) < 10 && 0}{Math.floor(secs % 60)}
        </Text>

      </View>
    </ScrollView>
  );
}

export default FourthLevelScreen;
