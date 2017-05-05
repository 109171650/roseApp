'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeVideo = require('react-native-video');

var _reactNativeVideo2 = babelHelpers.interopRequireDefault(_reactNativeVideo);

var VideoPlayer = function (_Component) {
  babelHelpers.inherits(VideoPlayer, _Component);

  function VideoPlayer() {
    var _ref;

    var _temp, _this, _ret;

    babelHelpers.classCallCheck(this, VideoPlayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_ref = VideoPlayer.__proto__ || Object.getPrototypeOf(VideoPlayer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true
    }, _this.onLoad = function (data) {
      _this.setState({ duration: data.duration });
    }, _this.onProgress = function (data) {
      _this.setState({ currentTime: data.currentTime });
    }, _this.onEnd = function () {
      _this.setState({ paused: true });
      _this.video.seek(0);
    }, _this.onAudioBecomingNoisy = function () {
      _this.setState({ paused: true });
    }, _this.onAudioFocusChanged = function (event) {
      _this.setState({ paused: !event.hasAudioFocus });
    }, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
  }

  babelHelpers.createClass(VideoPlayer, [{
    key: 'getCurrentTimePercentage',
    value: function getCurrentTimePercentage() {
      if (this.state.currentTime > 0) {
        return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
      }
      return 0;
    }
  }, {
    key: 'renderRateControl',
    value: function renderRateControl(rate) {
      var _this2 = this;

      var isSelected = this.state.rate === rate;

      return _react2.default.createElement(
        _reactNative.TouchableOpacity,
        { onPress: function onPress() {
            _this2.setState({ rate: rate });
          } },
        _react2.default.createElement(
          _reactNative.Text,
          { style: [styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }] },
          rate,
          'x'
        )
      );
    }
  }, {
    key: 'renderResizeModeControl',
    value: function renderResizeModeControl(resizeMode) {
      var _this3 = this;

      var isSelected = this.state.resizeMode === resizeMode;

      return _react2.default.createElement(
        _reactNative.TouchableOpacity,
        { onPress: function onPress() {
            _this3.setState({ resizeMode: resizeMode });
          } },
        _react2.default.createElement(
          _reactNative.Text,
          { style: [styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }] },
          resizeMode
        )
      );
    }
  }, {
    key: 'renderVolumeControl',
    value: function renderVolumeControl(volume) {
      var _this4 = this;

      var isSelected = this.state.volume === volume;

      return _react2.default.createElement(
        _reactNative.TouchableOpacity,
        { onPress: function onPress() {
            _this4.setState({ volume: volume });
          } },
        _react2.default.createElement(
          _reactNative.Text,
          { style: [styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }] },
          volume * 100,
          '%'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var flexCompleted = this.getCurrentTimePercentage() * 100;
      var flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.container },
        _react2.default.createElement(
          _reactNative.TouchableOpacity,
          {
            style: styles.fullScreen,
            onPress: function onPress() {
              return _this5.setState({ paused: !_this5.state.paused });
            }
          },
          _react2.default.createElement(_reactNativeVideo2.default, {
            ref: function ref(_ref2) {
              _this5.video = _ref2;
            },

            source: require('./broadchurch.mp4'),
            style: styles.fullScreen,
            rate: this.state.rate,
            paused: this.state.paused,
            volume: this.state.volume,
            muted: this.state.muted,
            resizeMode: this.state.resizeMode,
            onLoad: this.onLoad,
            onProgress: this.onProgress,
            onEnd: this.onEnd,
            onAudioBecomingNoisy: this.onAudioBecomingNoisy,
            onAudioFocusChanged: this.onAudioFocusChanged,
            repeat: false
          })
        ),
        _react2.default.createElement(
          _reactNative.View,
          { style: styles.controls },
          _react2.default.createElement(
            _reactNative.View,
            { style: styles.generalControls },
            _react2.default.createElement(
              _reactNative.View,
              { style: styles.rateControl },
              this.renderRateControl(0.25),
              this.renderRateControl(0.5),
              this.renderRateControl(1.0),
              this.renderRateControl(1.5),
              this.renderRateControl(2.0)
            ),
            _react2.default.createElement(
              _reactNative.View,
              { style: styles.volumeControl },
              this.renderVolumeControl(0.5),
              this.renderVolumeControl(1),
              this.renderVolumeControl(5)
            ),
            _react2.default.createElement(
              _reactNative.View,
              { style: styles.resizeModeControl },
              this.renderResizeModeControl('cover'),
              this.renderResizeModeControl('contain'),
              this.renderResizeModeControl('stretch')
            )
          ),
          _react2.default.createElement(
            _reactNative.View,
            { style: styles.trackingControls },
            _react2.default.createElement(
              _reactNative.View,
              { style: styles.progress },
              _react2.default.createElement(_reactNative.View, { style: [styles.innerProgressCompleted, { flex: flexCompleted }] }),
              _react2.default.createElement(_reactNative.View, { style: [styles.innerProgressRemaining, { flex: flexRemaining }] })
            )
          )
        )
      );
    }
  }]);
  return VideoPlayer;
}(_react.Component);

VideoPlayer.navigationOptions = {
  title: '首页',
  gesturesEnabled: true
};
exports.default = VideoPlayer;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden'
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc'
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C'
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12
  }
});