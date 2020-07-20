// components/dashboard.js

import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput, Modal } from 'react-native';
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import Logout from './logout'

export default class ShoppingBuddy extends Component {
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
      <View style={styles.container}>
        <TouchableOpacity style={styles.userDetails} onPress={() => this.props.navigation.navigate('Profile')} >
          <AntDesign name="user" size={30} />
        </TouchableOpacity>
        
        <View style={{ marginTop: 20, alignItems: "center", backgroundColor: "#008b8b", height: 400, padding: 32 }}>
          <Text>HIIIS</Text>
        </View>


        <View style={styles.addButton}>
          <TouchableOpacity
            style={styles.SubmitButtonStyle}
            activeOpacity={.5}
          >
            <Text style={styles.TextStyle}> + </Text>
          </TouchableOpacity>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  },
  addButton: {
    width: "30%",
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 260,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#008b8b',
  },
  TextStyle: {
    color: '#008b8b',
    textAlign: 'center',
    fontSize: 50
  },
  userDetails: {
    marginTop: 10,
    marginLeft: 250
  }
});