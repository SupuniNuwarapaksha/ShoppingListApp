import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput, Modal } from 'react-native';
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';


export default class Logout extends Component {
    constructor() {
        super();
        this.state = {
            uid: '',
        }
    }


    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('Login')
        })
            .catch(error => this.setState({ errorMessage: error.message }))
    }
    render() {
        this.state = {
            displayName: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid
        }
        return (
            <View>
               <TouchableOpacity style={{position: "absolute", top: 6, right: 32}} onPress={() => this.props.navigation.navigate('Shopping Buddy')}>
                    <AntDesign name="close" size={24} />
               </TouchableOpacity>
                <Text style={styles.textStyle}>
                    Hello, {this.state.displayName}
                </Text>

            <View style={{width: "20%", marginLeft: 140}}>
                <Button
                    color="#008b8b"
                    title="Logout"
                    onPress={() => this.signOut()}
                />
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff',
        
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20,
        textAlign: "center",
        marginTop: 250
      },
}
)
