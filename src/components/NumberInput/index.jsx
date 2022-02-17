import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';


function NumberInput({ value, setValue, editable, onClick, props }) {
  return (
    <TextInput style={{width: 40,height: 40,borderRadius: 20,borderWidth: 1,borderColor: 'black', backgroundColor: props.changeBackground, textAlign: 'center'}} onClick={onClick} 
      style={styles.container} 
      value={value.toString()}
      onChangeText={setValue}
      editable={editable}
    />
  )
}

export default NumberInput;