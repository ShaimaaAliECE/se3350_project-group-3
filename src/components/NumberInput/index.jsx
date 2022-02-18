import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
  },
});

function NumberInput({ value, setValue, editable, isSelected }) {
  return (
    <TextInput
      style={[
        styles.container,
        { backgroundColor: isSelected ? "yellow" : "white" },
      ]}
      value={value ? value.toString() : ""}
      onChangeText={setValue}
      editable={editable}
    />
  );
}

export default NumberInput;
