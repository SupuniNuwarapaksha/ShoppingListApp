// components/dashboard.js

import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import Logout from './logout';
import ViewList from './viewList'

var db = firebase.database();

var Data = [{ name: "Shop1" }, { name: "Shop2" }, { name: "Shop3" }, { name: "Shop4" }, { name: "Shop5" }, { name: "Shop6" }, { name: "Shop7" }, { name: "Shop8" }]

export default class ShoppingBuddy extends Component {

  state = {
    newListName: ''
  }
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      newListName: ''
    }
    

    this.shopList = Data
    
  }




  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
      .catch(error => this.setState({ errorMessage: error.message }))
  }



  addButton = (data) => {
    // firebase.database().ref('lists/' + 125).set({
    //   listName: this.state.newListName,
    //   userName: this.state.uid
    // });
    // console.log("hiii")
    const addNotice = firebase.database().ref(`bhhhh/'${this.state.uid}'`);
      addNotice.push().set({
        noticeTittle: "this.state.noticeTittle",
        notice: "this.state.notice",
        dates: "date.toLocaleDateString()",
        time: "date.toLocaleTimeString()",
      });
  }

  goAddButton = () => {
    console.log("Stupid")
  }

  render() {
    var lName;

    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
    }



    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.userDetails} onPress={() => this.props.navigation.navigate('Profile')} >
          <AntDesign name="user" size={30} />
        </TouchableOpacity>


        <View style={{ alignItems: "center", height: 450 }}>
          <ViewList />
        </View>

       
        <View style={{ flexDirection: 'row' }}>
          <View >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddNewList')} >
              <View style={styles.addNewButton}>
                <AntDesign name="plus" size={25} color="#cde5d9" />
              </View>
            </TouchableOpacity>
          </View>
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
    marginLeft: 250
  },
  Input: {
    borderWidth: 3,
    borderColor: '#008b8b',
    width: 200,
  },
  listItem: {
    fontSize: 20,
    marginLeft: 5,
    marginRight: 165,
    paddingTop: 10,
    paddingBottom: 10
  },
  listItemConteiner: {
    width: 250,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: "#f0f8ff",
  },
  addNewButton: {
    borderRadius: 25,
    backgroundColor: "#008b8b",
    padding: 10,
    marginLeft: 200,
    marginTop: 10
  }
});