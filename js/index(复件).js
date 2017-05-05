/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import VideoPlayer from './VideoPlayer';
class indexScreen extends Component {

  static navigationOptions = {
    title: '首页',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => navigate('VideoPlayer')}
          title="黄帝内经"
        />
      </View>
    );
  }
}

const rose = StackNavigator({
  Home: { screen: indexScreen },
  VideoPlayer: { screen: VideoPlayer },
});

AppRegistry.registerComponent('rose', () => rose);
