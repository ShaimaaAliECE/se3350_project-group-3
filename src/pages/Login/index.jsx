import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContext } from '../../../App';

const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // read error
    }
  
  
  }

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, levels, addUser } = useContext(GlobalContext);

    function loginCheck() {

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <h1>Login</h1>
        <Button 
        title="Sign Up"
        onPress={() => {
            navigation.navigate("SignUp")
        }}/>

            <Text>Username</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black'}} value={username} onChangeText={(text) => setUsername(text)} />
            
            <Text>Password</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black'}} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />


            <Button
        title="Submit"
        onPress={() => {

            let user = getUser()
            user.then(function(result) {
               
           

            if(username == result.username && password===result.password){
                addUser(username)
                navigation.navigate("Home")
            }
        })
        }       
    }
      />

    <Button
        title="Sign Up"
        onPress={() => {

           navigation.navigate("SignUp")
        }       
    }
      />
        </View>
    );
}

export default LoginScreen;