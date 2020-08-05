import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, Modal } from 'react-native';
import firebase from '../database/firebase'

export default class gettingStarted extends Component {
    state={
        loggedIn : false
    }

    checkuserState(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){ 
                console.log("hii"); 
                this.setState({loggedIn:true}) ;
                this.props.navigation.navigate('Shopping Buddy')
            }
            else { 
                console.log("Idiot"); 
                this.setState({loggedIn:false})
                this.props.navigation.navigate('Login')
            }
          });

          console.log(this.state.loggedIn)
          
    }

    render() {
        return ( 
            <View style={styles.container}>
            <View style={styles.header}>
                <Text>Header</Text>
                <Image source={require("../../assets/buddy.jpg")}
                    style={styles.logo} resizeMode="stretch" />
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerTitle}>Shopping buddy </Text>
                <Text style={styles.footerParagraph}>Manage your shopping list</Text>
            </View>
            <View style={{backgroundColor: "#fff"}}>
            <TouchableOpacity style={styles.SubmitButtonStyle} activeOpacity={.5} onPress={() => {
                this.checkuserState();}} >
                <Text style={styles.addButtonText}>Get started</Text>
            </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#008b8b"
    },
    header: {
        paddingBottom: 379,
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 80,
        paddingHorizontal: 30
    },
    footerTitle: {
        fontSize: 40,
        color: "#008b8b",
    },
    footerParagraph: {
        fontSize: 20,
        color: "#008b8b",
    },
    addButton: {
        marginTop: 60,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    SubmitButtonStyle: {
        paddingTop: 10,
        paddingBottom: 40,
        marginLeft: 140,
        backgroundColor: "#008b8b",
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff',
        width: "50%",
        height:"10%"
    },
    addButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20
    },
    logo: {
        marginTop: 400,
        width: 200,
        height: 150,
        borderRadius: 400 / 2
    }
});


