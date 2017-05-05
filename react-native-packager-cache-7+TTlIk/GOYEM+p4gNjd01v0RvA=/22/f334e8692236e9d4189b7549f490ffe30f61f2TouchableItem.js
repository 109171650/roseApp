Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var LOLLIPOP = 21;

var TouchableItem = function (_PureComponent) {
  babelHelpers.inherits(TouchableItem, _PureComponent);

  function TouchableItem() {
    babelHelpers.classCallCheck(this, TouchableItem);
    return babelHelpers.possibleConstructorReturn(this, (TouchableItem.__proto__ || Object.getPrototypeOf(TouchableItem)).apply(this, arguments));
  }

  babelHelpers.createClass(TouchableItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          pressOpacity = _props.pressOpacity,
          pressColor = _props.pressColor,
          borderless = _props.borderless,
          rest = babelHelpers.objectWithoutProperties(_props, ['style', 'pressOpacity', 'pressColor', 'borderless']);


      if (_reactNative.Platform.OS === 'android' && _reactNative.Platform.Version >= LOLLIPOP) {
        return _react2.default.createElement(
          _reactNative.TouchableNativeFeedback,
          babelHelpers.extends({}, rest, {
            background: _reactNative.TouchableNativeFeedback.Ripple(pressColor, borderless)
          }),
          _react2.default.createElement(
            _reactNative.View,
            { style: style },
            _react.Children.only(this.props.children)
          )
        );
      } else {
        return _react2.default.createElement(
          _reactNative.TouchableOpacity,
          babelHelpers.extends({}, rest, { style: style, activeOpacity: pressOpacity }),
          this.props.children
        );
      }
    }
  }]);
  return TouchableItem;
}(_react.PureComponent);

TouchableItem.propTypes = {
  delayPressIn: _propTypes2.default.number,
  borderless: _propTypes2.default.bool,
  pressColor: _propTypes2.default.string,
  pressOpacity: _propTypes2.default.number,
  children: _propTypes2.default.node.isRequired,
  style: _reactNative.View.propTypes.style
};
TouchableItem.defaultProps = {
  pressColor: 'rgba(255, 255, 255, .4)'
};
exports.default = TouchableItem;