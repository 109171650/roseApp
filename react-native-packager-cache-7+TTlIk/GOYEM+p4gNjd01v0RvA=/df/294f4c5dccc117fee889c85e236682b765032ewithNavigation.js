Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withNavigation;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = babelHelpers.interopRequireDefault(_hoistNonReactStatics);

function withNavigation(Component) {
  var componentWithNavigation = function componentWithNavigation(props, _ref) {
    var navigation = _ref.navigation;
    return _react2.default.createElement(Component, babelHelpers.extends({}, props, { navigation: navigation }));
  };

  componentWithNavigation.displayName = 'withNavigation(' + (Component.displayName || Component.name) + ')';

  componentWithNavigation.contextTypes = {
    navigation: _propTypes2.default.object.isRequired
  };

  return (0, _hoistNonReactStatics2.default)(componentWithNavigation, Component);
}