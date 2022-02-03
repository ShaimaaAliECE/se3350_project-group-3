import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import NumberInput from '../../components/NumberInput';

function FirstLevelScreen({ route, navigation }) {
  function generateRandomNumbers(level) {
    var arr = [];

    if (level == 1 || level == 2 || level == 3) {
      while (arr.length < 10) {
        var r = Math.floor(Math.random() * 20) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
      }
    }
    else if (level == 4) {
      while (arr.length < 20) {
        var r = Math.floor(Math.random() * 50) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
      }
    }
    else if (level == 5) {
      while (arr.length < 50) {
        var r = Math.floor(Math.random() * 100) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
      }
    }
    return arr;
  }

  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    setNumbers(generateRandomNumbers(1));
  }, []);

  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout;

    if (step < 10) {
      const timeout = setTimeout(() => {
        setStep(step + 1);
      }, 2000)
    }

    return clearTimeout(timeout);
  }, [step]);

  let maxCount = 10;

  const sortNumbers = (a, b) => {
    return a - b;
  }

  const algorithm = (step, numbers) => {
    const halfMaxCount = maxCount / 2;
    const quarterMaxCount = maxCount / 4;
    const eighthMaxCount = maxCount / 8;
    const sixteenthMaxCount = maxCount / 16;

    if (step == 2) {
      return {
        left: numbers.slice(0, halfMaxCount),
        right: numbers.slice(halfMaxCount, maxCount)
      }
    } else if (step == 3) {
      return {
        left: {
          left: numbers.slice(0, quarterMaxCount + 0.5),
          right: numbers.slice(quarterMaxCount + 0.5, halfMaxCount)
        },
        right: {
          left: numbers.slice(halfMaxCount, halfMaxCount + quarterMaxCount + 0.5),
          right: numbers.slice(halfMaxCount + quarterMaxCount + 0.5, maxCount)
        }
      }
    } else if (step == 4) {
      return {
        left: {
          left: {
            left: numbers.slice(0, 2),
            right: numbers.slice(2, 3)
          },
          right: {
            left: numbers.slice(3, 4),
            right: numbers.slice(4, 5)
          },
        },
        right: {
          left: {
            left: numbers.slice(5, 7),
            right: numbers.slice(7, 8),
          },
          right: {
            left: numbers.slice(8, 9),
            right: numbers.slice(9, 10)
          }
        }
      };
    } else if (step == 5) {
      return numbers;
    } else if (step == 6) {
      return {
        left: {
          left: {
            left: numbers.slice(0, 2).sort(sortNumbers),
            right: numbers.slice(2, 3).sort(sortNumbers)
          },
          right: {
            left: numbers.slice(3, 4).sort(sortNumbers),
            right: numbers.slice(4, 5).sort(sortNumbers)
          },
        },
        right: {
          left: {
            left: numbers.slice(5, 7).sort(sortNumbers),
            right: numbers.slice(7, 8).sort(sortNumbers),
          },
          right: {
            left: numbers.slice(8, 9).sort(sortNumbers),
            right: numbers.slice(9, 10).sort(sortNumbers)
          }
        }
      };
    } else if (step == 7) {
      return {
        left: {
          left: numbers.slice(0, quarterMaxCount + 0.5).sort(sortNumbers),
          right: numbers.slice(quarterMaxCount + 0.5, halfMaxCount).sort(sortNumbers)
        },
        right: {
          left: numbers.slice(halfMaxCount, halfMaxCount + quarterMaxCount + 0.5).sort(sortNumbers),
          right: numbers.slice(halfMaxCount + quarterMaxCount + 0.5, maxCount).sort(sortNumbers)
        }
      }
    } else if (step == 8) {
      return {
        left: numbers.slice(0, halfMaxCount).sort(sortNumbers),
        right: numbers.slice(halfMaxCount, maxCount).sort(sortNumbers)
      }
    } else if (step == 9) {
      return [...numbers].sort(sortNumbers);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginVertical: 60 }}>
        {/* First step numbers */}
        {
          step > 0 ?
            (
              <>
                <View style={{ height: 20 }} />
                <Text style={{ width: '60%', textAlign: 'center' }}>Step 0: Randomly generate 10 numbers ranging from 1 to 20</Text>
                <View style={{ height: 20 }} />
                <View style={{ flexDirection: 'row' }}>
                  {numbers.map((number) => {
                    return (
                      <NumberInput value={number} editable={false} />
                    )
                  })}
                </View>
              </>
            )
            : null
        }
        {
          step > 1 ? (
            <>
              <View style={{ height: 20 }} />
              <Text style={{ width: '60%', textAlign: 'center' }}>Step 1: Split the list of numbers as evenly as possible (half). The two broken down arrays now have a length of 5</Text>
              <View style={{ height: 20 }} />
              <View style={{ flexDirection: 'row' }}>
                {algorithm(2, numbers).left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(2, numbers).right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
              </View>
            </>
          )
            : null
        }
        {
          step > 2 ? (
            <>
              <View style={{ height: 20 }} />
              <Text style={{ width: '60%', textAlign: 'center' }}>Step 2: Again, split the 2 splitted lists of numbers as evenly as possible. The broken down arrays are now of lengths 2 and 3</Text>
              <View style={{ height: 20 }} />
              <View style={{ flexDirection: 'row' }}>
                {algorithm(3, numbers).left.left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(3, numbers).left.right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(3, numbers).right.left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(3, numbers).right.right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
              </View>
            </>
          )
            : null
        }
        {
          step > 3 ? (
            <>
              <View style={{ height: 20 }} />
              <Text style={{ width: '60%', textAlign: 'center' }}>Step 3: Again, split the 4 splitted lists of numbers as evenly as possible. The broken down arrays are now of lengths 1 and 2</Text>
              <View style={{ height: 20 }} />

              <View style={{ flexDirection: 'row' }}>
                {algorithm(4, numbers).left.left.left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(4, numbers).left.left.right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(4, numbers).left.right.left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(4, numbers).left.right.right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(4, numbers).right.left.left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(4, numbers).right.left.right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(4, numbers).right.right.left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(4, numbers).right.right.right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
              </View>
            </>
          )
            : null
        }
        {
          step > 4 ? (
            <>
              <View style={{ height: 20 }} />
              <Text style={{ width: '60%', textAlign: 'center' }}>Step 4: Take the broken down numbers and split them individually. All broken down arrays are broken to a length of 1 now, where each array consists of an individual value</Text>
              <View style={{ height: 20 }} />
              <View style={{ flexDirection: 'row' }}>
                {numbers.map((number, index) => {
                  return (
                    <>
                      <View style={{ width: index == 0 ? 0 : 20 }} />
                      <NumberInput value={number} editable={false} />
                    </>
                  )
                })}
              </View>
            </>
          )
            : null
        }
        {
          step > 5 ? (
            <>
              <View style={{ height: 20 }} />
              <Text style={{ width: '60%', textAlign: 'center' }}>Step 5: Now the numbers are ready to be sorted, the array sizes in the next steps are going to accumulate until the length of the original array is reached. The arrays will build up in a reverse direction in which they were broken down above. Which makes the arrays for this step to be of lengths 1 and 2. Select the smallest value of the individually-broken-down numbers and place them in the left-most slot available of the new list of numbers.</Text>
              <View style={{ height: 20 }} />
              <View style={{ flexDirection: 'row' }}>
                {algorithm(6, numbers).left.left.left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(6, numbers).left.left.right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(6, numbers).left.right.left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(6, numbers).left.right.right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(6, numbers).right.left.left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(6, numbers).right.left.right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(6, numbers).right.right.left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(6, numbers).right.right.right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
              </View>
            </>
          )
            : null
        }
        {
          step > 6 ? (
            <>
              <View style={{ height: 20 }} />
              <Text style={{ width: '60%', textAlign: 'center' }}>Step 6: Working backwards, the array lengths for this step are going to be of lengths 2 and 3. Select the smallest value of the current arrays and place them in the left-most slot available of the new list of numbers.</Text>
              <View style={{ height: 20 }} />

              <View style={{ flexDirection: 'row' }}>
                {algorithm(7, numbers).left.left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(7, numbers).left.right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(7, numbers).right.left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(7, numbers).right.right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
              </View>
            </>
          ) : null
        }
        {
          step > 7 ? (
            <>
              <View style={{ height: 20 }} />
              <Text style={{ width: '60%', textAlign: 'center' }}>Step 7: Again backwards, the array lengths for this step are going to be two arrays of lengths of 5. Select the smallest value of the current arrays and place them in the left-most slot available of the new list of numbers.</Text>
              <View style={{ height: 20 }} />
              <View style={{ flexDirection: 'row' }}>
                {algorithm(8, numbers).left.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
                <View style={{ width: 20 }} />
                {algorithm(8, numbers).right.map((number) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
              </View>
            </>
          )
            : null
        }
        {
          step > 8 ? (
            <>
              <View style={{ height: 20 }} />
              <Text style={{ width: '60%', textAlign: 'center' }}>Step 8: We have now worked backwards and reached the array size of the original array (length of 10). Finally, select the smallest value out of the current and place them in the left-most slot available in the final sorted array.</Text>
              <View style={{ height: 20 }} />
              <View style={{ flexDirection: 'row' }}>
                {algorithm(9, numbers).map((number, index) => {
                  return (
                    <NumberInput value={number} editable={false} />
                  )
                })}
              </View>
            </>
          )
            : null
        }
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />

        <Button
          title="Next Level"
          onPress={() => {
            navigation.navigate('SecondLevel', {
              numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            })
          }}
        />
      </View>

    </ScrollView>
  );
}

export default FirstLevelScreen