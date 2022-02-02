import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center'
  }
});

function NumberInput({ value, setValue, editable }) {
  return (
    <TextInput 
      style={styles.container} 
      value={value.toString()}
      onChangeText={setValue}
      editable={editable}
    />
  )
}

export default NumberInput;