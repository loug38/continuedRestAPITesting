import React, { Component } from 'react';
import {View, Text, StyleSheet, AppRegistry, Fetch, ListView, 
        StatusBar, Image, TouchableHighlight, Platform, Dimensions } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';

const window = Dimensions.get('window');
const data = [
    {claimNumber: '1234', description: 'arm injury', date: '09/22/2016'},
    {claimNumber: '5262', description: 'finger injury', date: '09/12/2016'},
    {claimNumber: '9910', description: 'leg injury', date: '09/05/2016'},
];


class ClaimsScreen extends Component{
    constructor(props) {
      super(props);
      var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
      this.state = {
        listDataSource: ds.cloneWithRows(data),
        data: data,
      };
    }

    _handleClaimPress(){
        this.props.navigator.push({
            ident: "MainScreen",
        });
    }

    //renders rows in the ListView
    _renderRow(arr, rowID){
        return(
            <View>
                <TouchableHighlight onPress={() => this._handleClaimPress()} underlayColor='dodgerblue'>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={styles.row}>
                            <Text style={styles.name}> {arr[rowID].claimNumber} </Text>
                            <View style={styles.details}>
                                <Text style={styles.role}> {arr[rowID].description} </Text>
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


    // display date.
    // 
    render(){
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
                        <Text style={{color: 'white', fontSize: 20}}> Claims </Text>
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
        marginRight: 20,
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

    bottomButton: {
        height: 50,
        alignItems: 'center',
        backgroundColor: 'dodgerblue',        
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {
            height: 2,
            width: 1,
        },
    },

    details: {
        flex: 1,
        flexDirection: 'row',
    }
});

module.exports = ClaimsScreen;