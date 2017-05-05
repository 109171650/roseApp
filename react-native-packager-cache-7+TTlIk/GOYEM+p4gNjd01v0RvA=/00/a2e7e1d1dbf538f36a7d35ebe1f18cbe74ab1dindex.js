var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNavigation = require('react-navigation');

var _VideoPlayer = require('./VideoPlayer');

var _VideoPlayer2 = babelHelpers.interopRequireDefault(_VideoPlayer);

var indexScreen = function (_Component) {
  babelHelpers.inherits(indexScreen, _Component);

  function indexScreen() {
    babelHelpers.classCallCheck(this, indexScreen);
    return babelHelpers.possibleConstructorReturn(this, (indexScreen.__proto__ || Object.getPrototypeOf(indexScreen)).apply(this, arguments));
  }

  babelHelpers.createClass(indexScreen, [{
    key: 'render',
    value: function render() {
      var navigate = this.props.navigation.navigate;

      return _react2.default.createElement(
        _reactNative.View,
        null,
        _react2.default.createElement(_reactNative.Button, {
          onPress: function onPress() {
            return navigate('VideoPlayer');
          },
          title: '\u9EC4\u5E1D\u5185\u7ECF'
        }),
        _react2.default.createElement(_reactNative.Text, { style: styles.button }),
        _react2.default.createElement(_reactNative.Button, {
          onPress: function onPress() {
            return navigate('VideoPlayer');
          },
          title: '\u4F24\u5BD2\u8BBA'
        }),
        _react2.default.createElement(_reactNative.Text, { style: styles.button }),
        _react2.default.createElement(_reactNative.Button, {
          onPress: function onPress() {
            return navigate('VideoPlayer');
          },
          title: '\u91D1\u532E\u8981\u7565'
        }),
        _react2.default.createElement(_reactNative.Text, { style: styles.button }),
        _react2.default.createElement(_reactNative.Button, {
          onPress: function onPress() {
            return navigate('VideoPlayer');
          },
          title: '\u5F90\u6587\u5175'
        }),
        _react2.default.createElement(_reactNative.Text, { style: styles.button }),
        _react2.default.createElement(_reactNative.Button, {
          onPress: function onPress() {
            return navigate('VideoPlayer');
          },
          title: '\u502A\u6D77\u53A6'
        })
      );
    }
  }]);
  return indexScreen;
}(_react.Component);

indexScreen.navigationOptions = {
  title: '首页',
  gesturesEnabled: true

};


var roseApp = (0, _reactNavigation.StackNavigator)({
  Home: { screen: indexScreen },
  VideoPlayer: { screen: _VideoPlayer2.default }
});

var styles = _reactNative.StyleSheet.create({
  button: {
    borderWidth: 1,
    color: 'white'
  }
});

_reactNative.AppRegistry.registerComponent('roseApp', function () {
  return roseApp;
});