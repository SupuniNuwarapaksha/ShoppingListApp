// components/dashboard.js

import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, ScrollView } from 'react-native';
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import Logout from './logout';
import ViewList from './viewList'
import _ from 'lodash';


export default class ShoppingBuddy extends Component {

  state = {
    shoppinhList: [],
    uid: firebase.auth().currentUser.uid,
}

componentDidMount() {
    firebase.database()
        .ref(`shoplist/'${this.state.uid}'`)
        .on('value', (data) => {
            const dataList = _.map(data.val(), (val, key) => {
                return {
                    val,
                    key,
                };
            });

            const arr = [];
            for (let a = 0; a < dataList.length; a++) {
                if(!(dataList[a].val.deleted)) {arr.push([
                    dataList[a].key,
                    dataList[a].val.listName,
                    dataList[a].val.dates,
                    dataList[a].val.time
                ]);}
            }
            console.log(arr);
            this.setState({
                shoppinhList: arr,
            });
        });
}

handleDelete(key) {
  console.log(key);
  firebase.database()
    .ref(`shoplist/'${this.state.uid}'/` + key)
    .remove();
}

gotobin(key, name, date, times){
  let deleted=true;
  firebase.database()
        .ref(`shoplist/'${this.state.uid}'`)
        .child(key)
        .update({
          listName: name,
          dates: date,
          time: times,
          deleted: true})
        .then(console.log("Hiii"));

}

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.userDetails} onPress={() => this.props.navigation.navigate('Profile')} >
          <AntDesign name="user" size={30} />
        </TouchableOpacity>

        <View style={{ alignItems: "center", height: 450 }}>
        <View style={{ marginTop: 20, alignItems: "center", height: 400, padding: 20 }}>
                <ScrollView>
                    {this.state.shoppinhList.map((list) => {
                        return (
                            <View style={{ flexDirection:'row' }} key={list[0]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Items', {item: list[0], name: list[1]} )}>
                                <View  style={styles.listItemConteiner}>
                                    <Text style={styles.textStyle}>{list[1]}</Text>
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => this.gotobin(list[0], list[1], list[2], list[3])} >
                                    <AntDesign name="delete" size={20} />
                                </TouchableOpacity>
                            </View>

                        )
                    })

                    }
                </ScrollView>
            </View>
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
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5
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
    width: 180,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: "#f0f8ff",
    marginRight: 3
  },
  addNewButton: {
    borderRadius: 25,
    backgroundColor: "#008b8b",
    padding: 10,
    marginLeft: 200,
    marginTop: 10
  },
  deleteButton: {
    paddingTop: 8
  }
});