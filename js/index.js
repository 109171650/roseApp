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
    gesturesEnabled: true
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => navigate('VideoPlayer')}
          title="黄帝内经"
        />
        <Text style={styles.button}></Text>
        <Button
          onPress={() => navigate('VideoPlayer')}
          title="伤寒论"
        />
                <Text style={styles.button}></Text>
        <Button
          onPress={() => navigate('VideoPlayer')}
          title="金匮要略"
        />
                <Text style={styles.button}></Text>
        <Button
          onPress={() => navigate('VideoPlayer')}
          title="徐文兵"
        />
                <Text style={styles.button}></Text>
        <Button
          onPress={() => navigate('VideoPlayer')}
          title="倪海厦"
        />
      </View>
    );
  }
}

const roseApp = StackNavigator({
  Home: { screen: indexScreen },
  VideoPlayer: { screen: VideoPlayer },
});

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        color:'white'
    },
});



AppRegistry.registerComponent('roseApp', () => roseApp);
