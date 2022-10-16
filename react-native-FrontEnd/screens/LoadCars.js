import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconButton, MD3Colors, Button } from 'react-native-paper'
import { HStack, NativeBaseProvider } from 'native-base';

const windowWidth = Dimensions.get('window').width;

export default function LoadCars({ route, navigation }) {
    const [DATA, setDATA] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const [username, setUsername] = useState(route.props.username);

    useEffect(() => {
        fetch(`http://192.168.1.100:8000/cars/loadCars/${username}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setDATA(json)
            });
    });

    componentDidMount = () => {
        const focusHandler = route.navigation.addListener('focus', () => {
            fetch(`http://192.168.1.100:8000/cars/loadCars/${username}`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    setDATA(json)
                });
        });
        return focusHandler;
    };


    const deleteCar = (car) => {
        fetch(`http://192.168.1.100:8000/cars/deleteCar/${car.carId}`, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.status === "200") {
                    Alert.alert(json.message);
                } else {
                    Alert.alert(json.message);
                }
            })
            .catch((err) => {
                Alert.alert("Error occured,Please try again later.")
            })
    }

    return (
        <NativeBaseProvider>

            <FlatList
                data={DATA}

                renderItem={({ item }) =>
                    <View style={{ borderWidth: 1, borderRadius: 20, margin: '3%', padding: 10 }}>
                        {/* <Image source={{ uri: URL + "/" + item.image }} style={styles.img} alt='Car Image' /> */}
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.location} >Location : {item.location}</Text>
                        <Text style={styles.date} >Date : {item.date}</Text>
                        <HStack space={"70%"} justifyContent={'center'}>
                            <IconButton
                                icon="pencil"
                                iconColor={MD3Colors.primary50}
                                size={20}
                                mode={'contained'}

                                onPress={() => {
                                    route.navigation.navigate("update", { item });
                                }}
                            />
                            <IconButton
                                icon="delete"
                                iconColor={MD3Colors.error50}
                                size={20}
                                mode={'contained'}

                                onPress={() => {
                                    Alert.alert(
                                        "Confirmation",
                                        "Do you want to delete this car?",
                                        [
                                            {
                                                text: "Yes",
                                                onPress: () => {
                                                    deleteCar(item);
                                                }
                                            },
                                            {
                                                text: "No",
                                                onPress: () => {
                                                    console.log("No");
                                                }
                                            }
                                        ],
                                        {
                                            cancelable: true
                                        }
                                    )
                                }}
                            />
                        </HStack>
                    </View>
                }
            />
            {/* <Image source={require("../assets/uploads/rn_image_picker_lib_temp_25bf7170-2d6a-4386-af1b-0697213f0e59.jpg")} style={styles.img} /> */}
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    description: {
        fontSize: 25,
        color: 'blue',
    },
    location: {
        fontWeight: '500',
        color: 'black',
        fontSize: 17,
        alignSelf: 'center'
    },
    date: {
        fontWeight: '500',
        color: 'black',
        fontSize: 17,
        alignSelf: 'center'
    }
})