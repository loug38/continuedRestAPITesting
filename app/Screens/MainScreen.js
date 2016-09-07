import React, { Component } from 'react';
import {View, Text, StyleSheet, AppRegistry, Fetch, ListView } from 'react-native';
import FCM from 'react-native-fcm';

var url = 'https://dbtest-9e865.firebaseio.com/contacts.json';
var ready = 0;

class MainScreen extends Component{

    constructor(props){
        super(props);
        this.state ={
            data: [],
            listDataSource: [],
        }
    }

    componentDidMount(){
        FCM.getFCMToken().then(token => {
            console.log(token); //would normally be saved in DB
        });

        this.notificationUnsubscribe = FCM.on('notification', (notif) => {
            //holder for now
        });

        //this.refreshUnsubscribe = FCM.on('refreshToken' => {
         //   console.log(token); // token may not be available on first load, so catch here.
        //})

        FCM.subscribeToTopic('topic/contacts');
        FCM.unsubscribeFromTopic('topic/contacts');
    }

    async GETfromDB(){
            var holder = [];
            let response = await fetch(url);
            let responseJson = await response.json();

            var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
            this.setState({data: [].concat(responseJson)});
            this.setState({listDataSource: ds.cloneWithRows(this.state.data)});
            ready = 1;

            return responseJson;
    }

    _renderRow(arr){
        return(
            <View> 
                <Text> {arr[0].name} </Text>
            </View>
        );
    }

    render(){
        let JSONtoString = this.GETfromDB();
        if (ready){

            return(
                <View style={styles.container}>
                   <Text> {`name: ${this.state.data[0].name}     role: ${this.state.data[0].role}`} </Text>
                   <Text> {`name: ${this.state.data[1].name}     role: ${this.state.data[1].role}`} </Text>
                </View>
            );
        } else {
            return(
                <View style={styles.container}>
                    <Text> loading... </Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
});

module.exports = MainScreen;