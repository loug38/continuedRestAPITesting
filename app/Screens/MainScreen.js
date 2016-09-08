import React, { Component } from 'react';
import {View, Text, StyleSheet, AppRegistry, Fetch, ListView, StatusBar, Image, TouchableOpacity } from 'react-native';
import FCM from 'react-native-fcm';
import Spinner from 'react-native-loading-spinner-overlay';
import Timer from 'react-native-timer';

var _ = require('lodash');
var url = 'https://dbtest-9e865.firebaseio.com/contacts.json';
var ready = 0;

class MainScreen extends Component{

    constructor(props){
        super(props);
        this.state ={
            data: [],
            listDataSource: [],
            timeLineTop: 0,
        }
    }

    // Updates the app with database info every 10 sec
    checkForUpdates(){
        this.setState({timeLineTop: this.state.timeLineTop += 1});
        let JSONtoString = this.GETfromDB();
    }

    componentDidMount(){
        Timer.setInterval(this, 'check for update', () => this.checkForUpdates(), 10000);
        FCM.getFCMToken().then(token => {
            console.log(token); //would normally be saved in DB
        });

        this.notificationUnsubscribe = FCM.on('notification', (notif) => {
            //holder for now
        });

        FCM.subscribeToTopic('topic/contacts');
        FCM.unsubscribeFromTopic('topic/contacts');
    }

    // Clears timers
    componentWillUnmount(){
        Timer.clearInterval(this);
    }

    // Pulls from database
    async GETfromDB(){
            let response = await fetch(url, {method: 'GET'})
            let responseJson = await response.json();

            var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
            this.setState({ data: [].concat(responseJson) });
            this.setState({ listDataSource: ds.cloneWithRows(this.state.data)} );
            ready = 1;
            return responseJson;
    }

    //renders rows in the ListView
    _renderRow(arr, rowID){
        return(
            <View>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Text style={styles.name}> {arr[rowID].name} </Text>
                        <Text style={styles.role}> {arr[rowID].role} </Text>
                    </View>
                </TouchableOpacity>
                <View style={{height: 1, backgroundColor: 'white'}} />
            </View>
        );
    }

    render(){
        // Initial loading screen while the ListView is being populated.
        while (!ready){
            let JSONtoString = this.GETfromDB();
            return(
                <View style={styles.loadingScreen}>
                    <StatusBar barStyle='light-content' />
                    <View style={{ flex: 1, backgroundColor: 'dodgerblue' }}>
                        <Spinner visible={true} />
                    </View>
                </View>
            );
        }

        // The actual style that creates the ListView
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
                    style={{flex: 1,}}
                />
                <View style={styles.bottomButton}>
                    <Text style={{fontSize: 20, color: 'white', paddingTop: 12}}> {this.state.timeLineTop} </Text>
                </View>
            </View>
        );
     
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

    loadingScreen: {
        flex: 1,
        alignItems: 'stretch',
    },

    backgroundWrapper:{
        position: 'absolute',
        top: 20, bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(0,0,0,.6)',

    },

    backgroundImage: {
        resizeMode: 'contain',
        backgroundColor: 'rgba(0,0,0,.6)'
    },

    row:{
        flex: 1,
        justifyContent: 'center',
        height: 100,
        alignItems: 'stretch',
        paddingLeft: 5,
        backgroundColor: 'rgba(128,128,128, 0.25)',
    },

    name: {
        fontSize: 20,
        color: 'white',
        backgroundColor: 'transparent',
    },

    role: {
        color: 'white',
        backgroundColor: 'transparent',
    },

    centerScreen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomButton: {
        height: 50,
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
    }
});

module.exports = MainScreen;