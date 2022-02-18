import React, {useState} from 'react';
import {Text, View, Modal, Pressable} from 'react-native';
import NumberInput from '../../components/NumberInput';
import { RadioButton } from 'react-native-paper';


export function AccessModal(props){
  const [checked, setChecked] = useState("")
  let arr =new Array();
  let result =[]
  console.log(props.option)
  

  function pause(arr, num){
    if (arr[0]==num)
      return true;
    else
      return false;
  }

  function loop(num){
    result =[]
    for(let i=0; i<props.number; i++){
      if(i==num)
        result.push(<View style={{ width: 20 }} />)
      result.push(<NumberInput value={""} editable={false}/>)
    }
    return result;
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
            <View style={{ flexDirection: 'row' }}>
            {loop(number[0])}
            </View>
              
            </>
              )
            
       
            })}

            <Pressable style={[{borderRadius: 20,padding: 10,elevation: 2}, {backgroundColor: '#2196F3'}]}
              onPress={() => { props.close() }}> 
              <Text style={{color: 'white',fontWeight: 'bold',textAlign: 'center'}}>Check</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}



  
