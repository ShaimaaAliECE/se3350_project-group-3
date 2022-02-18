import React, {useState} from 'react';
import {Text, View, Modal, Pressable} from 'react-native';
import NumberInput from '../../components/NumberInput';
import { RadioButton } from 'react-native-paper';


export function AccessModal(props){
  const [checked, setChecked] = useState("")
  let arr =new Array();
  console.log(props.option)
  

  function pause(index, num){
    if (index==num)
      return true;
    else
      return false;
  }

  
  console.log(arr)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Modal transparent={true} visible={true}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000',
            shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 4,elevation: 5}}>
            <Text style={{marginBottom: 15, textAlign: 'center'}}>How would you like to split this array?</Text>
            {props.options.map((number, index) => {
              return(
                <>
              <RadioButton
              value={index+1}
              label="Carto Base MAp"
              status={checked === index+1 ? 'checked' : 'unchecked'}
              onPress={() => { setChecked(index+1)}}
            />
            <NumberInput key={index} value={""} editable={false}/>

            {pause(index, number) ? 
            <View style={{ width: 20 }} />
            : null}
            </>
              )
            
       
            })}

            <Pressable style={[{borderRadius: 20,padding: 10,elevation: 2}, {backgroundColor: '#2196F3'}]}
              onPress={() => { props.close() }}> 
              <Text style={{color: 'white',fontWeight: 'bold',textAlign: 'center'}}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}



  
