import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NativeBaseProvider, Avatar } from 'native-base'
import { TextInput,Button } from 'react-native-paper'

export default function Account({route,navigation}) {

    return (
        <NativeBaseProvider>
            <Avatar bg="indigo.50" mt={'25%'} alignSelf="center" size="2xl" source={require('../assets/account.png')}></Avatar>
            <Text style={styles.username}>{route.props.username}</Text>
            <TextInput label={'Full Name'} mode={'flat'} editable={false} value={route.props.fullName} style={styles.fullNameTextField} />
            <Button icon="logout" mode="contained" style={styles.logOutBtn} onPress={()=>{route.navigation.navigate("Login")}}>
                LOG OUT
            </Button>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    username: {
        alignSelf: 'center',
        marginTop: '5%',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'blue',
        fontFamily: 'arial',
        textDecorationLine: 'underline'
    },
    fullNameTextField: {
        marginTop: '5%',
        width: '85%',
        alignSelf: 'center'
    },
    logOutBtn:{
        marginTop:'15%',
        width:'85%',
        alignSelf:'center',
        backgroundColor: '#0984e3'
    }
})