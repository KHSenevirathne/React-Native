import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, Box, Input, FormControl,HStack, Stack, Button } from 'native-base'

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const image = require('../assets/login_background.jpg')

export default function Login({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    loginUser = () => {
        fetch(`http://192.168.1.100:8000/users/login/${username}/${password}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (json.length === 0) {
                    Alert.alert("Username or password incorrect.Try again!")
                } else {
                    clearTextFields()
                    Alert.alert("Login Successful.");
                    navigation.navigate("Dash", {
                        username: json[0].username,
                        fullname: json[0].fullName
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    clearTextFields = () => {
        setUsername("");
        setPassword("");
    }

    return (
        <NativeBaseProvider>
            {/* <Box style={styles.container}> */}
            <ImageBackground source={image} resizeMode='cover' style={styles.img}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <FormControl isRequired>
                    <Stack mx="4">
                        <FormControl.Label>Username</FormControl.Label>
                        <Input type="text" style={styles.input} value={username} onChangeText={(e) => { setUsername(e) }} />
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" style={styles.input} value={password} onChangeText={(e) => { setPassword(e) }} />
                        <Button size="md" variant="subtle" colorScheme="purple" style={styles.login_btn} onPress={() => { loginUser() }} >
                            <Text style={styles.login_btn_label}>Login</Text>
                        </Button>
                    </Stack>
                </FormControl>
                <HStack space={2} mt="57%" alignSelf={'center'} >
                    <Text style={styles.signup_label}>Don't have an account?</Text>
                    <Button size="md" variant="link" colorScheme={'secondary'} style={styles.btn_Signup} onPress={() => { navigation.navigate("signup") }}>
                        <Text style={styles.btn_Signup_label}>Sign Up</Text>
                    </Button>
                </HStack>
            </ImageBackground>
            {/* </Box> */}
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%'
    },
    logo: {
        width: '60%',
        height: '20%',
        marginTop: '30%',
        alignSelf: 'center'
    },
    input: {
        color: 'white',
        fontSize: 20
    },
    login_btn: {
        marginTop: '4%'
    },
    login_btn_label: {
        color: 'purple',
        fontSize: 15,
        fontWeight: 'bold'
    },
    signup_label: {
        marginTop: '2.75%',
        color: 'white',
        fontSize: 17
        // position: 'absolute',
        // color: 'white',
        // fontSize: 17,
        // bottom: '4%',
        // left: '15%'
    },
    btn_Signup: {
        // width: '30%',
        // position: 'absolute',
        // bottom: '2.5%',
        // left: '55%'
    },
    btn_Signup_label: {
        color: 'pink',
        fontWeight: 'bold',
        fontSize: 17
    }
})