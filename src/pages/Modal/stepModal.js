import React, {useState} from 'react';
import {Text, View, Modal, Pressable} from 'react-native';
import NumberInput from '../../components/NumberInput';
import { RadioButton } from 'react-native-paper';


export function StepModal(props){
  const [checked, setChecked] = useState("")
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Modal transparent={true} visible={true}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000',
            shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 4,elevation: 5}}>
            <Text style={{marginBottom: 15, textAlign: 'center'}}>{props.data}</Text>
            <Pressable style={[{borderRadius: 20,padding: 10,elevation: 2}, {backgroundColor: '#2196F3'}]}
              onPress={() => { props.close() }}> 
              <Text style={{color: 'white',fontWeight: 'bold',textAlign: 'center'}}>Close!!!!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}



  
