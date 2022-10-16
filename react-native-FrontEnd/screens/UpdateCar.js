import { Alert, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeBaseProvider, Text, FormControl, Stack, Input, Button, TextArea } from 'native-base'

export default function UpdateCar({ route, navigation }) {

    const [date, setDate] = useState(route.params.item.date);
    const [location, setLocation] = useState(route.params.item.location);
    const [description, setDescription] = useState(route.params.item.description);

    const tempData = {
        date: date,
        location: location,
        description: description
    }

    const clearTextFields = () => {
        setDate("");
        setLocation("");
        setDescription("");
    }

    const updateCar = () => {

        if (date != "" && location != "" && description != "") {
            fetch('http://192.168.1.100:8000/cars/update', {
                method: 'PUT',
                body: JSON.stringify({
                    carId: route.params.item.carId,
                    date: date,
                    location: location,
                    description: description,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    if(json.status==="200"){
                        Alert.alert(json.message);
                        clearTextFields();
                    } else {
                        Alert.alert(json.message);
                    }
                });
        } else {
            Alert.alert("Please fill all the fields");
        }
    }


    return (
        <NativeBaseProvider>
            <Text fontSize={'4xl'} style={styles.updateCarHeading}>Update Car</Text>
            <FormControl isRequired marginTop={"16"}>
                <Stack mx="4">
                    <FormControl.Label>Date</FormControl.Label>
                    <Input type="text" style={styles.input} value={tempData.date} onChangeText={(e) => { setDate(e) }} />
                    <FormControl.Label>Location</FormControl.Label>
                    <Input type="text" style={styles.input} value={tempData.location} onChangeText={(e) => { setLocation(e) }} />
                    <FormControl.Label>Description</FormControl.Label>
                    <TextArea borderColor={'black'} w="100%" h="20" maxW="300" fontSize={15} value={tempData.description} onChangeText={(e) => { setDescription(e) }} />

                    <Button size="md" variant="solid" colorScheme="cyan" style={styles.update_btn} onPress={() => { updateCar() }} >
                        <Text style={styles.update_btn_label}>Update</Text>
                    </Button>
                    <Button size="md" variant="solid" colorScheme="coolGray" style={styles.update_btn} onPress={() => { clearTextFields() }} >
                        <Text style={styles.update_btn_label}>Clear</Text>
                    </Button>
                </Stack>
            </FormControl>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    updateCarHeading: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: '5%'
    },
    input: {
        color: 'black',
        fontSize: 20,
        borderWidth: 1
    },
    update_btn: {
        marginTop: '4%'
    },
    update_btn_label: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
})