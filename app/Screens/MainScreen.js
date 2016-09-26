import React, { Component } from 'react';
import {View, Text, StyleSheet, AppRegistry, Fetch, ListView, 
        StatusBar, Image, TouchableHighlight, Platform, Dimensions } from 'react-native';

import FCM from 'react-native-fcm';
import Spinner from 'react-native-loading-spinner-overlay';
import Timer from 'react-native-timer';
import Icon from 'react-native-vector-icons/FontAwesome';

var url = 'https://dbtest-9e865.firebaseio.com/contacts.json';
var ready = 0;
const window = Dimensions.get('window');

class MainScreen extends Component{

    constructor(props){
        super(props);
        this.state ={
            data: [],
            listDataSource: [],
            timeLineTop: 0,
            currentStep: 'Claims'
        }
    }

    componentDidMount(){
        Timer.setInterval(this, 'check for update', () => this.checkForUpdates(), 10000);
        FCM.getFCMToken().then(token => {
            console.log(token); //would normally be saved in DB
        });

        this.notificationUnsubscribe = FCM.on('notification', (notif) => {
            //holder for now
        });

        FCM.subscribeToTopic('contacts');
        FCM.unsubscribeFromTopic('contacts');
    }

    // Clears timers
    componentWillUnmount(){
        Timer.clearInterval(this);
    }

    // Updates the app with database info every 10 sec
    checkForUpdates(){
        this.setState({timeLineTop: this.state.timeLineTop += 1});
        let JSONtoString = this.GETfromDB();
    }

    // Pulls from database and marks global 'ready' to true.
    async GETfromDB(){
            let response = await fetch(url, {method: 'GET'})
            let responseJson = await response.json();

            var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
            this.setState({ data: [].concat(responseJson) });
            this.setState({ listDataSource: ds.cloneWithRows(this.state.data) });
            ready = 1;
            return responseJson;
    }

    _handleClaimPress(){
        ready = 0;
        this.props.navigator.push({
            ident: "MessagesScreen",
        });
    }

    //renders rows in the ListView
    _renderRow(arr, rowID){
        return(
            <View>
                <TouchableHighlight onPress={() => this._handleClaimPress()} underlayColor='dodgerblue'>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={styles.row}>
                            <Text style={styles.name}> {arr[rowID].name} </Text>
                            <View style={styles.details}>
                                <Text style={styles.role}> {arr[rowID].role} </Text>
                                <Text style={styles.role}> {arr[rowID].date} </Text>
                            </View>
                        </View>
                        <Icon name={'angle-right'} size={30} color={'#aaaaaa'} style={styles.moreIcon}/>
                    </View>
                </TouchableHighlight>
                <View style={{backgroundColor: 'rgba(128,128,128, 0.25)'}}>
                </View>
            </View>
        );
    }

    render(){
        // Initial loading screen while waiting for promises to finish
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

        // The actual style that creates the ListView one for Android and one for iOS
        if (Platform.OS === 'ios'){
            //iOS
            return(
                <View style={styles.container}>
                    <StatusBar barStyle='light-content' />
                    <View style={styles.statusBar} />

                    {/* The top navigation bar 🌟 */}
                    <View style={styles.navBar}>
                        <TouchableHighlight onPress={() => this._handlePress} underlayColor='dodgerblue'>
                            <Icon name={'bars'} size={20} color={'white'} />
                        </TouchableHighlight>
                        <Text style={{color: 'white', fontSize: 20}}> Contacts </Text>
                        <TouchableHighlight onPress={() => this._handlePress} underlayColor='dodgerblue'>
                            <Icon name={'search'} size={20} color={'white'} />
                        </TouchableHighlight>
                    </View>

                    {/* List of contacts */}
                    <View style={styles.listViewContainer}>
                        <ListView
                            dataSource={this.state.listDataSource}
                            renderRow={(data, sectionID, rowID) => {return this._renderRow(this.state.data, rowID)}}
                            style={{flex: 1}}
                        />
                    </View>                        

                </View>
            );
         } else {
            //Android
            return(
                <View style={styles.container}>
                    <View style={styles.backgroundWrapperAndroid}>
                        <Image source={require('../../img/sf.jpg')} style={styles.backgroundImage} />
                    </View>
                        <ListView
                            dataSource={this.state.listDataSource}
                            renderRow={(data, sectionID, rowID) => {return this._renderRow(this.state.data, rowID)}}
                            style={{flex: 1}}
                        />
                    <View style={styles.bottomButton}>
                        <Text style={{fontSize: 20, color: 'white', paddingTop: 12}}> {this.state.timeLineTop} </Text>
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
        alignItems: 'stretch',
        backgroundColor: '#DDDDDD',
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

    navBar: {
        flexDirection: 'row',
        backgroundColor: 'dodgerblue',
        height: 40,
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },

    titleBar: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset:{
            height: 2,
            width: 2,
        },
        backgroundColor: 'white',
    },

    title: {
        fontSize: 40,
        color: '#444444',
    },

    listViewContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {
            height: 2,
            width: 2,
        },
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
    },
     
    row:{
        flex: 1,
        justifyContent: 'center',
        height: 70,
        alignItems: 'stretch',
        paddingLeft: 20,
        paddingTop: 10,
        marginTop: 5,
        marginRight: 10,
    },

    name: {
        fontSize: 20,
        color: 'black',
        backgroundColor: 'transparent',
    },

    role: {
        color: '#aaaaaa',
        backgroundColor: 'transparent',
    },

    moreIcon: {
        paddingTop: 20,
        paddingRight: 15,
    },

    details: {
        flex: 1,
        flexDirection: 'row',
    }
});

module.exports = MainScreen;