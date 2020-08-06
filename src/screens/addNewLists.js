import React, { Component } from 'react'
import { StyleSheet,Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import firebase from '../database/firebase'

export default class AddNewLists extends Component {
    state = {
        listName: '',
        listError: '',
        uid: ''
      };
    
      validate = () => {
        // console.log('dfsjvilc');
    
        let isError = false;
        const errors = {
          listError: '',
        };
    
    
        if (this.state.listName.length < 1) {
          isError = true;
          errors.listError = 'Notice Content is required *';
        }
    
        this.setState({
          listError: errors.listError
        });
        return isError;
      };

      saveList = () => {
          this.setState({
            uid: firebase.auth().currentUser.uid,
          })
          console.log(this.state.uid)
          let date = new Date();

         const addNotice = firebase.database().ref(`shoplist/'${this.state.uid}'`);
      addNotice.push().set({
        listName: this.state.listName,
        dates: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        deleted: false,
      });
    
          this.setState({
            noticeTittle: '',
            notice: '',
          });
    
          this.props.navigation.navigate('Shopping Buddy')
      };

    render() {
        this.state= {
            uid: firebase.auth().currentUser.uid,
        }
        return (
            <View style={{alignItems: 'center', marginTop: 200}}>
                <TextInput style={styles.inputStyle} 
                value={this.state.listName}
                onChangeText={text => {this.state.listName=text}}
                />
                <TouchableOpacity   onPress={() => this.saveList()}>
              <View style={styles.addNewButton} >
                <AntDesign name="plus" size={25} color="#cde5d9" />
              </View>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 3,
    borderColor: '#008b8b',
    width: 200,
    },
    addNewButton: {
    backgroundColor: "#008b8b",
    padding: 10,
    marginTop: 10
    }
});
