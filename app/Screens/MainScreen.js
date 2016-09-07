import React, { Component } from 'react';
import {View, Text, StyleSheet, AppRegistry, Fetch, ListView, StatusBar, Image, TouchableOpacity } from 'react-native';
import FCM from 'react-native-fcm';

var url = 'https://dbtest-9e865.firebaseio.com/contacts.json';
var ready = 0;
var totalRows = 0;
var currentRow = 0;

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

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.data !== nextState.data);
    }

    async GETfromDB(){
            var holder = [];
            let response = await fetch(url);
            let responseJson = await response.json();

            var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
            this.setState({ data: [].concat(responseJson) });
            this.setState({ listDataSource: ds.cloneWithRows(this.state.data)} );
            ready = 1;
            totalRows = this.state.data.length;

            return responseJson;
    }

    _renderRow(arr, rowID){
         let style = [
            styles.row,
            {'backgroundColor': 'rgba(0,0,0,0.75)',
             'flex': 1,
             'justifyContent': 'center',
             'height': 100,
             'alignItems': 'stretch',
             'borderTopWidth': (rowID == 0 ? 0 : 1),
             'borderColor': 'white',
            }
        ];
        return(
            <View>
                <TouchableOpacity>
                    <View style={style}>
                        <Text style={styles.name}> {arr[rowID].name} </Text>
                        <Text style={styles.role}> {arr[rowID].role} </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render(){
        let JSONtoString = this.GETfromDB();
        if (ready){
            return(
                <View style={styles.container}>
                    <StatusBar barStyle='light-content' />
                    <View style={styles.statusBar} />
                    <View style={styles.backgroundWrapper}>
                        <Image source={require('../../img/sf.jpg')} style={styles.backgroundImage} />
                    </View>
                    <ListView
                        dataSource={this.state.listDataSource}
                        renderRow={(data, sectionID, rowID) => {return this._renderRow(this.state.data, rowID)}}
                    />
                </View>
            );
        } else {
            return(
                <View style={styles.container}>
                    <StatusBar barStyle='light-content' />
                    <View style={styles.statusBar} />
                    <View style={styles.centerScreen} >
                        <Text> loading... </Text>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },

    statusBar: {
        height: 20,
        backgroundColor: '#1e90ff',
        alignItems: 'stretch',
    },

    backgroundWrapper:{
        position: 'absolute',
        top: 20, bottom: 0, left: 0, right: 0,
    },

    backgroundImage: {
        resizeMode: 'contain',
    },

    name: {
        fontSize: 20,
        color: 'white',
    },

    role: {
        color: 'white',
    },

    centerScreen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

module.exports = MainScreen;