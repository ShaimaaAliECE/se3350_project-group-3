import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
const fs = require('fs')



export default function SignUp() {
   
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Username</Text>
        <TextInput style={{ borderWidth: 1, borderColor: 'black'}} value={username} onChangeText={(text) => setUsername(text)} />
        
        <Text>Password</Text>
        <TextInput style={{ borderWidth: 1, borderColor: 'black'}} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        <Button
            title="Sign Up"
            onPress={() => {
                fs.writeFile('../LoginJSON.json', JSON.stringify(username))
                fs.writeFile('../LoginJSON.json', JSON.stringify(password))
         
            }       
        }
        />
    </View>
    )
}