import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const setUser = async (username, password) => {
    let value = {username, password}
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch(e) {
      // save error
    }
  
    console.log('Done.')
    console.log(value)
  }

const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // read error
    }
  
  
  }

export default function SignUp({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    return (
      
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{width:"80%", textAlign:"center", float: "left"}}>
        <h1>Sign Up</h1>
      </div>
      
      <Button 
      title="Login"
      onPress={() => {
        navigation.navigate("Login")
      }}/>
      
        <Text>Username</Text>
        <TextInput style={{ borderWidth: 1, borderColor: 'black'}} value={username} onChangeText={(text) => setUsername(text)} />
        
        <Text>Password</Text>
        <TextInput style={{ borderWidth: 1, borderColor: 'black'}} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        <Button
            title="Sign Up"
            onPress={() => {
                setUser(username, password)
         
            }       
        }
        />
        <Button
            title="Get"
            onPress={() => {
                console.log(getUser())
         
            }       
        }
        />
    </View>
    )
}