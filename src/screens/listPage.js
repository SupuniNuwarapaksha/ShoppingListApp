import React, { Component } from 'react'
import { Text, View, Button, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import _ from 'lodash';

export default class ListPage extends Component {

    state = {
        listID: this.props.route.params.item,
        listName: this.props.route.params.name,
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
        console.log(this.state.listID);
        console.log(this.state.listName);
        console.log(this.state.uid);
        firebase.database()
            .ref(`itemList/'${this.state.uid}'/'${this.state.listID}'`)
            .on('value', (data) => {
                const dataList = _.map(data.val(), (val, key) => {
                    return {
                        val,
                        key,
                    };
                });

                const arr = [];
                for (let a = 0; a < dataList.length; a++) {
                    arr.push([
                        dataList[a].key,
                        dataList[a].val.itemName,
                        dataList[a].val.itemPrice,
                        dataList[a].val.brought,
                    ]);
                }
                console.log(arr);
                this.setState({
                    shoppinhList: arr,
                });
                console.log("hiii")

                console.log(this.state.shoppinhList)
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
            brought: false
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
                    <Text style={styles.addText}>Add a new item to the {this.state.listName} list</Text>
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
                    <View style={styles.itemList} >
                    <Text style={styles.listName}> {this.state.listName} </Text>
                        <ScrollView>
                            {this.state.shoppinhList.map((list) => {
                                return (
                                    <View style={{ flexDirection: 'row' }} key={list[0]}>
                                        {( list[3]) ?
                                            <TouchableOpacity style={styles.buyButton}  >
                                                <AntDesign name="checkcircle" size={20} color="#a9a9a9" />
                                            </TouchableOpacity>
                                            : ((list[3] == ''))
                                        }

                                        {( !list[3]) ?
                                            <TouchableOpacity style={styles.buyButton}  >
                                                <AntDesign name="checkcircle" size={20} color="gray" />
                                            </TouchableOpacity>
                                            : (( !list[3] == ''))
                                        }

                                        {( !list[3]) ?
                                        <View style={styles.listItemConteiner}>
                                            <Text style={styles.buytextStyle}>{list[1]}</Text>
                                            <Text style={styles.textStylePrice}>Rs. {list[2]}</Text>
                                        </View>
                                        : (( !list[3] == ''))
                                    }
                                    {( list[3]) ?
                                        <View style={styles.listItemConteiner}>
                                            <Text style={styles.textStyle}>{list[1]}</Text>
                                            <Text style={styles.textStylePrice}>Rs. {list[2]}</Text>
                                        </View>
                                        : (( list[3] == ''))
                                    }

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
        textAlign: "center",
        marginTop: 20
    },
    addNewButtonIcon: {
        paddingTop: 2
    },
    listName: {
        fontSize: 30,
        textAlign: 'center',
        color: '#008b8b',
    },
    listItemConteiner: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    textStyle: {
        paddingLeft: 10,
        fontSize: 20,
        color: "gray",
    },
    textStylePrice: {
        paddingLeft: 10,
        fontSize: 18,
        color: "gray",
        paddingTop: 2
    },
    buytextStyle:{
        paddingLeft: 10,
        fontSize: 20,
        color: "gray",
        textDecorationLine: 'line-through', textDecorationStyle: 'solid'
     },
    itemList: {
        marginTop: 20,
        alignItems: "center",
        backgroundColor: "#f0f8ff",
        width: 270,
        marginLeft: 27
    },
    buyButton: {
        paddingTop: 3
    }

})
