Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');

var _resolveAssetSource2 = babelHelpers.interopRequireDefault(_resolveAssetSource);

var _VideoResizeMode = require('./VideoResizeMode.js');

var _VideoResizeMode2 = babelHelpers.interopRequireDefault(_VideoResizeMode);

var styles = _reactNative.StyleSheet.create({
  base: {
    overflow: 'hidden'
  }
});

var Video = function (_Component) {
  babelHelpers.inherits(Video, _Component);

  function Video(props) {
    babelHelpers.classCallCheck(this, Video);

    var _this = babelHelpers.possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).call(this, props));

    _this.seek = function (time) {
      _this.setNativeProps({ seek: time });
    };

    _this.presentFullscreenPlayer = function () {
      _this.setNativeProps({ fullscreen: true });
    };

    _this.dismissFullscreenPlayer = function () {
      _this.setNativeProps({ fullscreen: false });
    };

    _this._assignRoot = function (component) {
      _this._root = component;
    };

    _this._onLoadStart = function (event) {
      if (_this.props.onLoadStart) {
        _this.props.onLoadStart(event.nativeEvent);
      }
    };

    _this._onLoad = function (event) {
      if (_this.props.onLoad) {
        _this.props.onLoad(event.nativeEvent);
      }
    };

    _this._onError = function (event) {
      if (_this.props.onError) {
        _this.props.onError(event.nativeEvent);
      }
    };

    _this._onProgress = function (event) {
      if (_this.props.onProgress) {
        _this.props.onProgress(event.nativeEvent);
      }
    };

    _this._onSeek = function (event) {
      if (_this.state.showPoster) {
        _this.setState({ showPoster: false });
      }

      if (_this.props.onSeek) {
        _this.props.onSeek(event.nativeEvent);
      }
    };

    _this._onEnd = function (event) {
      if (_this.props.onEnd) {
        _this.props.onEnd(event.nativeEvent);
      }
    };

    _this._onFullscreenPlayerWillPresent = function (event) {
      if (_this.props.onFullscreenPlayerWillPresent) {
        _this.props.onFullscreenPlayerWillPresent(event.nativeEvent);
      }
    };

    _this._onFullscreenPlayerDidPresent = function (event) {
      if (_this.props.onFullscreenPlayerDidPresent) {
        _this.props.onFullscreenPlayerDidPresent(event.nativeEvent);
      }
    };

    _this._onFullscreenPlayerWillDismiss = function (event) {
      if (_this.props.onFullscreenPlayerWillDismiss) {
        _this.props.onFullscreenPlayerWillDismiss(event.nativeEvent);
      }
    };

    _this._onFullscreenPlayerDidDismiss = function (event) {
      if (_this.props.onFullscreenPlayerDidDismiss) {
        _this.props.onFullscreenPlayerDidDismiss(event.nativeEvent);
      }
    };

    _this._onReadyForDisplay = function (event) {
      if (_this.props.onReadyForDisplay) {
        _this.props.onReadyForDisplay(event.nativeEvent);
      }
    };

    _this._onPlaybackStalled = function (event) {
      if (_this.props.onPlaybackStalled) {
        _this.props.onPlaybackStalled(event.nativeEvent);
      }
    };

    _this._onPlaybackResume = function (event) {
      if (_this.props.onPlaybackResume) {
        _this.props.onPlaybackResume(event.nativeEvent);
      }
    };

    _this._onPlaybackRateChange = function (event) {
      if (_this.state.showPoster && event.nativeEvent.playbackRate !== 0) {
        _this.setState({ showPoster: false });
      }

      if (_this.props.onPlaybackRateChange) {
        _this.props.onPlaybackRateChange(event.nativeEvent);
      }
    };

    _this._onAudioBecomingNoisy = function () {
      if (_this.props.onAudioBecomingNoisy) {
        _this.props.onAudioBecomingNoisy();
      }
    };

    _this._onAudioFocusChanged = function (event) {
      if (_this.props.onAudioFocusChanged) {
        _this.props.onAudioFocusChanged(event.nativeEvent);
      }
    };

    _this._onBuffer = function (event) {
      if (_this.props.onBuffer) {
        _this.props.onBuffer(event.nativeEvent);
      }
    };

    _this.state = {
      showPoster: true
    };
    return _this;
  }

  babelHelpers.createClass(Video, [{
    key: 'setNativeProps',
    value: function setNativeProps(nativeProps) {
      this._root.setNativeProps(nativeProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var resizeMode = this.props.resizeMode;
      var source = (0, _resolveAssetSource2.default)(this.props.source) || {};

      var uri = source.uri || '';
      if (uri && uri.match(/^\//)) {
        uri = 'file://' + uri;
      }

      var isNetwork = !!(uri && uri.match(/^https?:/));
      var isAsset = !!(uri && uri.match(/^(assets-library|file|content|ms-appx|ms-appdata):/));

      var nativeResizeMode = void 0;
      if (resizeMode === _VideoResizeMode2.default.stretch) {
        nativeResizeMode = _reactNative.NativeModules.UIManager.RCTVideo.Constants.ScaleToFill;
      } else if (resizeMode === _VideoResizeMode2.default.contain) {
        nativeResizeMode = _reactNative.NativeModules.UIManager.RCTVideo.Constants.ScaleAspectFit;
      } else if (resizeMode === _VideoResizeMode2.default.cover) {
        nativeResizeMode = _reactNative.NativeModules.UIManager.RCTVideo.Constants.ScaleAspectFill;
      } else {
        nativeResizeMode = _reactNative.NativeModules.UIManager.RCTVideo.Constants.ScaleNone;
      }

      var nativeProps = babelHelpers.extends({}, this.props);
      babelHelpers.extends(nativeProps, {
        style: [styles.base, nativeProps.style],
        resizeMode: nativeResizeMode,
        src: {
          uri: uri,
          isNetwork: isNetwork,
          isAsset: isAsset,
          type: source.type || '',
          mainVer: source.mainVer || 0,
          patchVer: source.patchVer || 0
        },
        onVideoLoadStart: this._onLoadStart,
        onVideoLoad: this._onLoad,
        onVideoError: this._onError,
        onVideoProgress: this._onProgress,
        onVideoSeek: this._onSeek,
        onVideoEnd: this._onEnd,
        onVideoBuffer: this._onBuffer,
        onVideoFullscreenPlayerWillPresent: this._onFullscreenPlayerWillPresent,
        onVideoFullscreenPlayerDidPresent: this._onFullscreenPlayerDidPresent,
        onVideoFullscreenPlayerWillDismiss: this._onFullscreenPlayerWillDismiss,
        onVideoFullscreenPlayerDidDismiss: this._onFullscreenPlayerDidDismiss,
        onReadyForDisplay: this._onReadyForDisplay,
        onPlaybackStalled: this._onPlaybackStalled,
        onPlaybackResume: this._onPlaybackResume,
        onPlaybackRateChange: this._onPlaybackRateChange,
        onAudioFocusChanged: this._onAudioFocusChanged,
        onAudioBecomingNoisy: this._onAudioBecomingNoisy
      });

      if (this.props.poster && this.state.showPoster) {
        var posterStyle = {
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          resizeMode: 'contain'
        };

        return _react2.default.createElement(
          _reactNative.View,
          { style: nativeProps.style },
          _react2.default.createElement(RCTVideo, babelHelpers.extends({
            ref: this._assignRoot
          }, nativeProps)),
          _react2.default.createElement(_reactNative.Image, {
            style: posterStyle,
            source: { uri: this.props.poster }
          })
        );
      }

      return _react2.default.createElement(RCTVideo, babelHelpers.extends({
        ref: this._assignRoot
      }, nativeProps));
    }
  }]);
  return Video;
}(_react.Component);

exports.default = Video;


Video.propTypes = babelHelpers.extends({
  src: _react.PropTypes.object,
  seek: _react.PropTypes.number,
  fullscreen: _react.PropTypes.bool,
  onVideoLoadStart: _react.PropTypes.func,
  onVideoLoad: _react.PropTypes.func,
  onVideoBuffer: _react.PropTypes.func,
  onVideoError: _react.PropTypes.func,
  onVideoProgress: _react.PropTypes.func,
  onVideoSeek: _react.PropTypes.func,
  onVideoEnd: _react.PropTypes.func,
  onVideoFullscreenPlayerWillPresent: _react.PropTypes.func,
  onVideoFullscreenPlayerDidPresent: _react.PropTypes.func,
  onVideoFullscreenPlayerWillDismiss: _react.PropTypes.func,
  onVideoFullscreenPlayerDidDismiss: _react.PropTypes.func,

  source: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    uri: _react.PropTypes.string
  }), _react.PropTypes.number]),
  resizeMode: _react.PropTypes.string,
  poster: _react.PropTypes.string,
  repeat: _react.PropTypes.bool,
  paused: _react.PropTypes.bool,
  muted: _react.PropTypes.bool,
  volume: _react.PropTypes.number,
  rate: _react.PropTypes.number,
  playInBackground: _react.PropTypes.bool,
  playWhenInactive: _react.PropTypes.bool,
  disableFocus: _react.PropTypes.bool,
  controls: _react.PropTypes.bool,
  currentTime: _react.PropTypes.number,
  progressUpdateInterval: _react.PropTypes.number,
  onLoadStart: _react.PropTypes.func,
  onLoad: _react.PropTypes.func,
  onBuffer: _react.PropTypes.func,
  onError: _react.PropTypes.func,
  onProgress: _react.PropTypes.func,
  onSeek: _react.PropTypes.func,
  onEnd: _react.PropTypes.func,
  onFullscreenPlayerWillPresent: _react.PropTypes.func,
  onFullscreenPlayerDidPresent: _react.PropTypes.func,
  onFullscreenPlayerWillDismiss: _react.PropTypes.func,
  onFullscreenPlayerDidDismiss: _react.PropTypes.func,
  onReadyForDisplay: _react.PropTypes.func,
  onPlaybackStalled: _react.PropTypes.func,
  onPlaybackResume: _react.PropTypes.func,
  onPlaybackRateChange: _react.PropTypes.func,
  onAudioFocusChanged: _react.PropTypes.func,
  onAudioBecomingNoisy: _react.PropTypes.func,

  scaleX: _react.PropTypes.number,
  scaleY: _react.PropTypes.number,
  translateX: _react.PropTypes.number,
  translateY: _react.PropTypes.number,
  rotation: _react.PropTypes.number
}, _reactNative.View.propTypes);

var RCTVideo = (0, _reactNative.requireNativeComponent)('RCTVideo', Video, {
  nativeOnly: {
    src: true,
    seek: true,
    fullscreen: true
  }
});