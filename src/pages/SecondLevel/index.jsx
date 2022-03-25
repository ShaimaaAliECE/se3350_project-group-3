import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  Image,
  PanResponder,
} from "react-native";
import NumberInput from "../../components/NumberInput";
import "../../Algorithms/MergeSort";
import Data from "../../config/steps.json";
import { TouchableOpacity } from "react-native-web";
import { Audio } from "expo-av";
import { StepModal } from "../Modal/stepModal";
import Question from "../../Images/question.png";
import { Verification } from "../Modal/verification";
import { Reset } from "../Modal/resetModal";
import { GlobalContext } from '../../../App';

const {
  generateArray,
  merge,
  splitArray,
} = require("../../Algorithms/MergeSort");

let arr = new Array();
arr[0] = generateArray(2);

function SecondLevelScreen({ route, navigation }) {
  const [step, setStep] = useState(1);
  const [sound, setSound] = React.useState();
  const [isCorrect, setIsCorrect] = useState(false);
  const [resetModalVisible, setResetModalVisble] = useState(false);
  const [secs, setSecs] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const { user, levels } = useContext(GlobalContext);

  const [idleTime, setIdleTime] = useState(300000);
  let idleTimeout;

  const setTimeouts = () => {
    idleTimeout = setTimeout(home, idleTime);
  };

  const clearTimeouts = () => {
    if (idleTimeout) {
      clearTimeout(idleTimeout);
    }
  };

  const home = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    if (attempt >= 3) {
      setResetModalVisble(true);
      setAttempt(0);
    }
  }, [attempt]);

  useEffect(() => {
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
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
    };
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (!isComplete) setSecs(s => s + 1);
      else setSecs(s => s);
    }, 1000);
    return () => clearInterval(timerId);
  }, [isComplete]);

  useEffect(() => {
    setStep(1);
    arr = new Array();
    arr[0] = generateArray(2);
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
  const [checkAnswerVisible, setCheckAnswerVisible] = useState(false);
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
    arr = new Array();
    arr[0] = generateArray(2);
    console.log("Array is" + arr[0]);
  }

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeCheckAnswer = () => {
    setCheckAnswerVisible(false);
  };

  function isActive() {
    if (modalVisible) return true;
    else return false;
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
          levelThree: (!isComplete), 
          levelFour: true, 
          levelFive: true });
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
    for (let i = 1; i < step; i++) {
      if (i > 5) {
        break;
      } else if (i == 1) {
        arr[1] = split(arr, 1);

        console.log(blankArr);

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

    if (step > 5) {
      for (let i = 5; i <= step - 1; i++) {
        arr[i] = merged(arr[i - 1], i);
        let newArr = [...blankArr];
        newArr[i] = merged(newArr[i - 1], i, true);
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
      if (j > 4) {
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
              {mapSegment(j, blankArr[j] ? blankArr[j].length : 0)}
            </View>
          </View>
        );
      }
    }

    return components;
  }

  function generateMergeAlgorithm() {
    let components = [];

    for (let j = 5; j < arr.length; j++) {
      components.push(
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            {mapSegment(j, blankArr[j] ? blankArr[j].length : 0)}
          </View>
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

    if (!isComplete) {
      if (step != 1 && count == 10 * (step - 1)) {
        if (step >= 9) {
          setIsComplete(true);
        }
        setIsCorrect(true);
        playCorrectFeedback();
      } else {
        setIsCorrect(false);
        let num = attempt;
        setAttempt(num + 1);
        playIncorrectFeedback();
      }
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
        <Text>
          Aside from the first step where there are no numbers to fill in, you
          may not go to the next question unless your answer has been marked
          correct!
        </Text>
        <Text>
          After getting an answer correct, DO NOT try to change the numbers and
          then go to the next question. You will still see the next question,
          but will not be able to go to the question after until all errors are
          fixed!!!
        </Text>
        <Button
          onPress={() => {
            if (step > 1 && step <= 9) {
              checkAnswer();
              setCheckAnswerVisible(true);
            }
          }}
          title="Check Answer"
        />
        {displayCheck() ? (
          <Verification close={closeCheckAnswer} success={isCorrect} />
        ) : null}

        {isActive() ? (
          <StepModal close={closeModal} data={Data.Level2[`${step - 1}`]} />
        ) : null}

        {isResetModalActive() ? <Reset reset={reset} /> : null}

        <Button
          onPress={() => {
            if (step <= 8 && step > 1 && isCorrect) {
              setIsCorrect(false);
              setStep(step + 1);
              setModalVisible(true);
            } else if (step == 1) {
              setStep(step + 1);
              setModalVisible(true);
            }
          }}
          title="Next Question"
        />
        <Button title="Go to Level Select" onPress={() => navigation.navigate("MergeSortLevels", {
           levelThree: (!isComplete), 
           levelFour: true, 
           levelFive: true })} />
        <Image
          style={{ width: 25, height: 25 }}
          source={{
            uri: Question,
          }}
          onClick={() => setModalVisible(true)}
        />
        <Text style={{ fontSize: 40 }}>
          {Math.floor(secs / 60)}:{secs % 60 < 10 && 0}
          {Math.floor(secs % 60)}
        </Text>
      </View>
    </ScrollView>
  );
}

export default SecondLevelScreen;
