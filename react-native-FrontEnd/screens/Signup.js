import { StyleSheet, Text, View, Dimensions, ImageBackground, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, Box, Input, FormControl, Stack, Button, Heading, WarningOutlineIcon, HStack } from 'native-base'

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const image = require('../assets/login_background.jpg')

export default function Signup({ navigation }) {

  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  saveUser = async () => {

    if (fullName != "" && contact != "" && username != "" && password != "") {
      fetch('http://192.168.1.100:8000/users', {
        method: 'POST',
        body: JSON.stringify({
          fullName: fullName,
          contact: contact,
          username: username,
          password: password
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status === "500") {
            Alert.alert(json.message);
          } else {
            Alert.alert(json.message);
            clearTextFields();
          }
        })
        .catch((err) => Alert.alert(err));
    } else {
      Alert.alert("Please fill all the fields and try again.")
    }
  }

  const clearTextFields = () => {
    setFullName("");
    setContact("");
    setUsername("");
    setPassword("");
  }

  return (
    <NativeBaseProvider>
      {/* <Box style={styles.container}> */}
      <ImageBackground source={image} resizeMode='cover' style={styles.img}>
        <Heading style={styles.heading} color={'#fff200'} size={'3xl'}>Sign Up</Heading>
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>Full Name</FormControl.Label>
            <Input type="text" style={styles.input} value={fullName} onChangeText={(e) => { setFullName(e) }} />
            <FormControl.Label>Mobile Number</FormControl.Label>
            <Input type="text" style={styles.input} value={contact} onChangeText={(e) => { setContact(e) }} />
            <FormControl.Label>Username</FormControl.Label>
            <Input type="text" style={styles.input} value={username} onChangeText={(e) => { setUsername(e) }} />
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" style={styles.input} value={password} onChangeText={(e) => { setPassword(e) }} />

            <Button size="md" variant="subtle" colorScheme="purple" style={styles.signup_btn} onPress={() => { saveUser() }} >
              <Text style={styles.signup_btn_label}>Sign Up</Text>
            </Button>
          </Stack>
        </FormControl>
        <HStack space={2} alignSelf={'center'} mt="35%">
          <Text style={styles.login_label}>Already have an account?</Text>
          <Button size="md"
            variant="link"
            colorScheme={'secondary'}
            style={styles.btn_login}
            onPress={() => {
              try {
                navigation.navigate("Login")
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <Text style={styles.btn_login_label}>Login</Text>
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
  signup_btn: {
    marginTop: '4%'
  },
  signup_btn_label: {
    color: 'purple',
    fontSize: 15,
    fontWeight: 'bold'
  },
  login_label: {
    // position: 'absolute',
    marginTop:'2.75%',
    color: 'white',
    fontSize: 17
    // bottom: '4%',
    // left: '15%'
  },
  btn_login: {
    // width: '30%',
    // position: 'absolute',
    // bottom: '2.5%',
    // left: '55%'
  },
  btn_login_label: {
    color: 'pink',
    fontWeight: 'bold',
    fontSize: 17
  },
  heading: {
    alignSelf: 'center',
    marginTop: '25%',
    marginBottom: '10%',
    textDecorationLine: 'underline'
  }
})