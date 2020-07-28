// components/dashboard.js

import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import Logout from './logout';

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
    firebase.database().ref('lists/' + 125).set({
      listName: this.state.newListName,
      userName: this.state.uid
    });
    console.log("hiii")
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


        <View style={{ marginTop: 20, alignItems: "center", height: 400, padding: 20 }}>
          <FlatList
            data={this.shopList}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <View style={styles.listItemConteiner}>
                <Text style={styles.listItem}>{item.name}</Text>
                <TouchableOpacity style={styles.addList}>
                  <View style={{ paddingTop: 10 }}>
                    <AntDesign name="delete" size={16} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <Text style={{ marginTop: 20, fontSize: 20, color: '#008b8b', }}>Add a new list</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput style={styles.Input} onChangeText={text => {this.state.newListName=text}} />
          <View >
            <TouchableOpacity onPress={()=>{this.addButton(this.state.newListName)}} >
              <View style={styles.addNewButton}>
                <AntDesign name="plus" size={16} color="#cde5d9" />
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
    marginTop: 10,
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
    backgroundColor: "#008b8b",
    padding: 10
  }
});