import react, {useState, useContext} from "react";
import {View, Text, Picker} from 'react-native'
import { GlobalContext } from '../../../App';


export default function UserData() {

    const [selectedValue, setSelectedValue] = useState("2");
    const { user, levels, getLevelInfo } = useContext(GlobalContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 200}}>
          
      <Text style={{ fontSize: 25 }}>Please select an algorithm</Text>
      <View style={{ height: 120 }} />

      <View style={{ flexDirection: 'column' }}>
       <h1>{user}</h1>
        <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Level 2" value="2"/>
        <Picker.Item label="Level 3" value="3"/>
        <Picker.Item label="Level 4" value="4"/>
        <Picker.Item label="Level 5" value="5"/>
      </Picker>
      <View style={{ flexDirection: 'column' }}>
        <Text>Time Spent On Each Level: {getLevelInfo(parseInt(selectedValue)).timeSpent}</Text>
        <Text>Number of Mistakes made for each level: {getLevelInfo(parseInt(selectedValue)).numOfMistakes}</Text>
        <Text>Number of Attempts per level: {getLevelInfo(parseInt(selectedValue)).numOfAttempts}</Text>
        </View>
        
      </View>

    </View>

    )
}