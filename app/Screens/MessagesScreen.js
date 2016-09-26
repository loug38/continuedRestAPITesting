import React, { Component } from 'react';
import {View, Text, StyleSheet, AppRegistry, 
        StatusBar, TouchableHighlight , Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const window = Dimensions.get('window');

class MessagesScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
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
            </View>
        );
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
});

module.exports = MessagesScreen;