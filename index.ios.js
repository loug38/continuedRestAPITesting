import React, { Component } from 'react';
import { AppRegistry} from 'react-native';
import AppNavigator from './app/Navigation/AppNavigator';

class RestTest extends Component {
    render() {
        return(
            <AppNavigator initialRoute={{ident: 'MainScreen'}} />
        );
    }
}

AppRegistry.registerComponent('RestTest', () => RestTest);
