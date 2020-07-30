import React, { Component } from 'react'
import { Text, View, Button, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import _ from 'lodash';

export default class ListPage extends Component {

    state = {
        listID: '',
        listName: '',
        uid: firebase.auth().currentUser.uid,
        itemName: '',
        itemPrice: '',
        shoppinhList: []
    }

    componentDidMount() {
        this.setState({
            listID: this.props.route.params.item,
            listName: this.props.route.params.name,
            uid: firebase.auth().currentUser.uid,
        });

    }

    saveList = () => {
        this.setState({
            uid: firebase.auth().currentUser.uid,
        })
        console.log(this.state.uid)

        const addNotice = firebase.database().ref(`itemList/'${this.state.uid}'/'${this.state.listID}'`);
        addNotice.push().set({
            itemName: this.state.itemName,
            itemPrice: this.state.itemPrice,
            brought: "false"
        });

        this.setState({
            itemName: '',
            itemPrice: '',
        });

    };

    render() {
        return (
            <View style={{ alignItems: "center" }}>
                <ScrollView>
                    <Text> {this.state.listID} </Text>
                    <Text> {this.state.listName} </Text>
                    <Text style={styles.addText}>Add a new item to the list</Text>
                    <View style={{ flexDirection: 'row' }} >
                        <TextInput style={styles.input1} placeholder=" Item Name"
                            onChangeText={text => { this.state.itemName = text }} />

                        <TextInput style={styles.input2} placeholder=" Item Price" 
                            onChangeText={text => { this.state.itemPrice = text }} />
                        <TouchableOpacity style={styles.addNewButton} onPress={() => this.saveList()}>
                            <View style={styles.addNewButtonIcon}>
                                <AntDesign name="plus" size={25} color="#cde5d9" />
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View>
                    <ScrollView>
                    {this.state.shoppinhList.map((list) => {
                        return (
                            <View style={{ flexDirection:'row' }} key={list[0]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Items', {item: list[0], name: list[1]} )}>
                                <View  style={styles.listItemConteiner}>
                                    <Text style={styles.textStyle}>{list[1]}</Text>
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton}  >
                                    <AntDesign name="delete" size={20} />
                                </TouchableOpacity>
                            </View>

                        )
                    })

                    }
                </ScrollView>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input1: {
        borderWidth: 1,
        borderColor: '#008b8b',
        width: 200,
    },
    input2: {
        borderWidth: 1,
        borderColor: '#008b8b',
        width: 100,
    },
    addNewButton: {
        backgroundColor: "#008b8b",
    },
    addText: {
        fontSize: 20,
        color: '#008b8b',
    },
    addNewButtonIcon: {
        paddingTop: 2
    }
})
