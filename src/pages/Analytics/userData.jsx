import react, {useState} from "react";
import {View, Text, Picker} from 'react-native'


export default function UserData() {

    const [selectedValue, setSelectedValue] = useState("2");

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 200}}>
          
      <Text style={{ fontSize: 25 }}>Please select an algorithm</Text>
      <View style={{ height: 120 }} />

      <View style={{ flexDirection: 'row' }}>
       
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

        <Text>Time Spent On Each Level</Text>
        <Text>Number of Mistakes made for each level</Text>
        <Text>Number of Attempts per level</Text>
        
      </View>

    </View>

    )
}