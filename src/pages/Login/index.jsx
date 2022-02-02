import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function loginCheck() {

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>User Login</Text>

            <Text>Username</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black'}} value={username} onChangeText={(text) => setUsername(text)} />
            
            <Text>Password</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black'}} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />


            <Button
        title="Submit"
        onPress={() => {

            console.log(username);
            console.log(password); 
            loginCheck()
        }       
    }
      />
        </View>
    );
}

export default LoginScreen;