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
        itemPrice: 0,
        shoppinhList: [],
        totalPrice: 0,
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
                let price= 0;
                let total=0;
                for (let a = 0; a < dataList.length; a++) {
                    arr.push([
                        dataList[a].key,
                        dataList[a].val.itemName,
                        dataList[a].val.itemPrice,
                        dataList[a].val.brought,
                        price= dataList[a].val.itemPrice,
                        total= total + parseInt(price)
                    ]);
                }
                console.log(arr);
                this.setState({
                    shoppinhList: arr,
                    totalPrice: total
                });
                console.log("hiii")

                console.log(this.state.shoppinhList)
                console.log(this.state.totalPrice)
            });
    }

    saveList = () => {
        if(this.state.itemName && this.state.itemPrice) {
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
    }

    };

    handleDelete(key) {
        console.log(key);
        firebase.database()
          .ref(`itemList/'${this.state.uid}'/'${this.state.listID}'/` + key)
          .remove();
      }

      updateBrought(key, name, price, brought){
          let buy= !brought;
        firebase.database()
        .ref(`itemList/'${this.state.uid}'/'${this.state.listID}'`)
        .child(key)
        .update({
            itemName: name, 
            itemPrice: price, 
            brought: buy})
        .then(console.log("Hiii"));
      }

    render() {
        return (
            <View style={{ alignItems: "center" }}>
                <ScrollView>
                    <Text style={styles.addText}>Add a new item to the {this.state.listName} list</Text>
                    <View style={{ flexDirection: 'row' }} >
                        <TextInput style={styles.input1} placeholder=" Item Name"
                            onChangeText={text => { this.state.itemName = text }} />

                        <TextInput style={styles.input2} placeholder=" Item Price" keyboardType="numeric"
                            onChangeText={value => { this.state.itemPrice = value }} 
                            // onChangeText={value => value.match(/[0-9]*/gm) && setNum1(value)}
                            />
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
                                                <AntDesign name="checkcircle" size={20} color="#a9a9a9" onPress={()=> {this.updateBrought(list[0], list[1], list[2], list[3])}} />
                                            </TouchableOpacity>
                                            : ((list[3] == ''))
                                        }

                                        {( !list[3]) ?
                                            <TouchableOpacity style={styles.buyButton}  >
                                                <AntDesign name="checkcircle" size={20} color="gray" onPress={()=> {this.updateBrought(list[0], list[1], list[2], list[3])}} />
                                            </TouchableOpacity>
                                            : (( !list[3] == ''))
                                        }
                                        <View style={{width: 200}}>
                                        {( list[3]) ?
                                        <View style={styles.listItemConteiner}>
                                            <Text style={styles.buytextStyle}>{list[1]}</Text>
                                            <Text style={styles.textStylePrice}>Rs. {list[2]}</Text>
                                        </View>
                                        : (( !list[3] == ''))
                                    }
                                    {( !list[3]) ?
                                        <View style={styles.listItemConteiner}>
                                            <Text style={styles.textStyle}>{list[1]}</Text>
                                            <Text style={styles.textStylePrice}>Rs. {list[2]}</Text>
                                        </View>
                                        : (( list[3] == ''))
                                    }
                                    </View>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => this.handleDelete(list[0])} >
                                    <AntDesign name="delete" size={20} />
                                </TouchableOpacity>
                                    </View>

                                )
                            })

                            }
                        </ScrollView>
                    </View>
                </ScrollView>
                <View style={styles.price}>
                <Text style={styles.priceText}>Total: </Text>
                <Text style={styles.priceText1}>{this.state.totalPrice}/=</Text>
                </View>
                
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
        marginTop: 30,
        alignItems: "center",
        backgroundColor: "#f0f8ff",
        width: 270,
        marginLeft: 27,
        height: 370
    },
    buyButton: {
        paddingTop: 3
    },
    deleteButton: {
        paddingTop: 3,
    },
    priceText: {
        color: '#008b8b',
        fontSize: 25,
        textAlign: "center",
        
    },
    priceText1: {
        color: "#1e90ff",
        fontSize: 50,
        textAlign: "center",
        paddingTop: 10
    },
    price: {
        flexDirection: 'row',
        marginTop: 15
    }
})
