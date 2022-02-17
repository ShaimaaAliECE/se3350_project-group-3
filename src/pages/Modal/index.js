import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import NumberInput from '../../components/NumberInput';
import { Alert, Modal, StyleSheet, Pressable } from 'react-native';


export function AccessModal(state){

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Modal
        transparent={true}
        visible={state}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>How would you like to split this array?</Text>
            <NumberInput value={0} editable={false}/>
            <Pressable
              style={[styles.button, styles.buttonClose]} > 
              <Text style={styles.textStyle}>Close</Text>

            </Pressable>
          </View>
        </View>
      </Modal>
      
    </View>
      )

      
      
}



  
