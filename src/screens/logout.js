import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView, TextInput, Modal, Image } from 'react-native';
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import _ from 'lodash';


export default class Logout extends Component {
    state = {
        shoppinhList: [],
        uid: firebase.auth().currentUser.uid,
        displayName: firebase.auth().currentUser.displayName,
        showBin: false
    }

    componentDidMount() {
        console.log(this.state.uid)
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
                    if (dataList[a].val.deleted) {
                        arr.push([
                            dataList[a].key,
                            dataList[a].val.listName,
                            dataList[a].val.dates,
                            dataList[a].val.time
                        ]);
                    }
                }
                // console.log(arr);
                this.setState({
                    shoppinhList: arr,
                });
                this.state.shoppinhList = arr;
                console.log(this.state.shoppinhList)
            });
    }

    handleDelete(key) {
        console.log(key);
        firebase.database()
            .ref(`shoplist/'${this.state.uid}'/` + key)
            .remove();
    }

    gotobin(key, name, date, times) {
        let deleted = true;
        firebase.database()
            .ref(`shoplist/'${this.state.uid}'`)
            .child(key)
            .update({
                listName: name,
                dates: date,
                time: times,
                deleted: false
            })
            .then(console.log("Hiii"));

    }

    showme(){
        let myVal= this.state.showBin;
        this.setState({
            showBin: !myVal
        })
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('Login')
        })
            .catch(error => this.setState({ errorMessage: error.message }))
    }
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Image source={require("../../assets/userIcon.png")}
                        style={styles.logo} resizeMode="stretch" />
                </View>
                <Text style={styles.textStyle1}>
                    Hello, {this.state.displayName}
                </Text>
                <TouchableOpacity style={{ alignItems: "center" }} onPress={()=> {this.showme()}} >
                    <AntDesign name="delete" size={24} />
                </TouchableOpacity>
                {( this.state.showBin) ?
                <View style={{ alignItems: "center", height: 300 }}>
                    <View style={{ marginTop: 20, alignItems: "center", height: 300 }}>
                        <ScrollView>
                            {this.state.shoppinhList.map((list) => {
                                return (
                                    <View style={{ flexDirection: 'row' }} key={list[0]}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Items', { item: list[0], name: list[1] })}>
                                            <View style={styles.listItemConteiner}>
                                                <Text style={styles.textStyle}>{list[1]}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.restoreButton} onPress={() => this.gotobin(list[0], list[1], list[2], list[3])} >
                                            <Text style={styles.textStyle2}>Restore</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.deleteButton} onPress={() => this.handleDelete(list[0])} >
                                            <AntDesign name="delete" size={20} />
                                        </TouchableOpacity>
                                    </View>

                                )
                            })

                            }
                        </ScrollView>
                    </View>
                </View>
                : (( !this.state.showBin))
            }
                <View style={{ width: "20%", marginLeft: 140, marginTop: 40 }}>
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
    textStyle1: {
        fontSize: 15,
        marginBottom: 20,
        textAlign: "center",
        marginTop: 25
    },
    logo: {
        width: 100,
        height: 80,
        borderRadius: 400 / 2
    },
    header: {
        alignItems: 'center',
        marginTop: 30
    },
    listItemConteiner: {
        width: 180,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        backgroundColor: "#f0f8ff",
        marginRight: 3
    },
    textStyle: {
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5
    },
    deleteButton: {
        paddingTop: 8
    },
    restoreButton: {
        width: 60,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        backgroundColor: "#f0f8ff",
        marginRight: 3
    },
    textStyle2: {
        fontSize: 15,
        paddingTop: 7,
        paddingBottom: 5,
        paddingLeft: 5
    },
}
)
