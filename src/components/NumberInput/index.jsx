import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';


function NumberInput({ value, setValue, editable, onClick, isSelected} ) {




  return (
    <TextInput style={{width: 40,height: 40,borderRadius: 20,borderWidth: 1,borderColor: 'black', textAlign: 'center', backgroundColor: isSelected ? 'yellow' : 'transparent'}} 
      onClick={onClick}  
      value={value.toString()}
      onChangeText={setValue}
      editable={editable}
    />
  )
}

export default NumberInput;