import React, {Component} from 'react';
import {Navigator, StyleSheet} from 'react-native';

import MainScreen from '../../app/Screens/MainScreen';
import ClaimsScreen from '../../app/Screens/ClaimsScreen';
import MessagesScreen from '../../app/Screens/MessagesScreen';

class AppNavigator extends Component{
    render(){
        return(
            <Navigator
	            initialRoute={{ident: this.props.initialRoute}}
                ref="AppNavigator"
	            renderScene={this._renderScene}
	            configureScene={(route) => ({
                    ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight
		        })}
            />
	    );
    }

    _renderScene(route, navigator){
        var globalNavigatorProps = {navigator}
        switch(route.ident.ident){
        	case "MainScreen": {
        	    return (
                    <MainScreen {...globalNavigatorProps} />
        		);
                break;
            }

            case "ClaimsScreen": {
                return(
                    <ClaimsScreen {...globalNavigatorProps} />
                );
                break;
            }

            case "MessagesScreen": {
                return(
                    <MessagesScreen {...globalNavigatorProps} />
                );
                break;
            }

        	default: {
        	    return (
                    <MainScreen {...globalNavigatorProps} />
		        );
                break;
            }
        }
    }
}

module.exports = AppNavigator;