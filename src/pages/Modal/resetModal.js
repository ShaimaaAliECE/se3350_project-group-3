import React, {useEffect, useState} from 'react';
import {Text, View, Modal, Pressable} from 'react-native';
import { RadioButton } from 'react-native-paper';

export function Reset(props){
  const [message, setMessage] = useState("Wrong")

  useEffect(() => {
    if(props.success){
      setMessage("Correct!")
      if(props.closeSelf){
        props.closeSelf()
      }
    }else
      setMessage("Wrong!")
      
  }, [props.success])
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Modal transparent={true} visible={true}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000',
            shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 4,elevation: 5}}>
            <Text style={{marginBottom: 15, textAlign: 'center'}}>You have unsuccessfully attempted this level 3 times. {<br/>}
            You now have the followign options: </Text>
            <Pressable style={[{borderRadius: 20,padding: 10,elevation: 2}, {backgroundColor: '#2196F3'}]}
              onPress={() => { props.reset(1) }}> 
              <Text style={{color: 'white',fontWeight: 'bold',textAlign: 'center'}}>Restart Level</Text>
            </Pressable>
            <Pressable style={[{borderRadius: 20,padding: 10,elevation: 2}, {backgroundColor: '#2196F3'}]}
              onPress={() => { props.reset(2) }}> 
              <Text style={{color: 'white',fontWeight: 'bold',textAlign: 'center'}}>Previous Levels</Text>
            </Pressable>
            <Pressable style={[{borderRadius: 20,padding: 10,elevation: 2}, {backgroundColor: '#2196F3'}]}
              onPress={() => { props.reset(3) }}> 
              <Text style={{color: 'white',fontWeight: 'bold',textAlign: 'center'}}>Quit Game</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}
