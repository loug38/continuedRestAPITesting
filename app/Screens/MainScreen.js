import React, { Component } from 'react';
import {View, Text, StyleSheet, AppRegistry, Fetch } from 'react-native';
import FCM from 'react-native-fcm';

var url = 'https://dbtest-9e865.firebaseio.com/contacts.json';

class MainScreen extends Component{

    constructor(props){
        super(props);
        this.state ={
            data: [],
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
            let responseJson = await response.json;
            for (var i = 0; i < responseJson.length(); i++){
                holder.push(responseJson[i]);
            }
            this.setState({data: [].concat(holder)});
            return responseJson.layer;
    }

    render(){
        let JSONtoString = this.GETfromDB();
        return(
           <View style={styles.container}>
               <Text> {this.state.data} </Text>
           </View>
        );
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