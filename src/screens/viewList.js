import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import firebase from '../database/firebase'
import _ from 'lodash';
import { AntDesign } from '@expo/vector-icons';


export default class ViewList extends React.Component {
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
                    arr.push([
                        dataList[a].key,
                        dataList[a].val.listName,
                    ]);
                }
                console.log(arr);
                this.setState({
                    shoppinhList: arr,
                });
            });
    }

    changeScreen (){
        console.log("hey stpid")
        this.props.navigation.navigate('AddNewList')
    }

    render() {
        return (
            <View style={{ marginTop: 20, alignItems: "center", height: 400, padding: 20 }}>
                <ScrollView>
                    {this.state.shoppinhList.map((list) => {
                        return (
                            <View style={{ flexDirection:'row' }}>
                                <TouchableOpacity onPress={() => this.changeScreen()}>
                                <View key={list[0]} style={styles.listItemConteiner}>
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
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    listItemConteiner: {
        width: 180,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        backgroundColor: "#f0f8ff",
    },
    deleteButton: {
        paddingTop: 7
    }
});
