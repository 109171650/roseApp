Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactNative = require('react-native');

var _CardStackStyleInterpolator = require('./CardStackStyleInterpolator');

var _CardStackStyleInterpolator2 = babelHelpers.interopRequireDefault(_CardStackStyleInterpolator);

var DefaultTransitionSpec = {
  duration: 250,
  timing: _reactNative.Animated.spring,
  bounciness: 0,
  speed: 9
};

var SlideFromRightIOS = {
  screenInterpolator: _CardStackStyleInterpolator2.default.forHorizontal
};

var ModalSlideFromBottomIOS = {
  screenInterpolator: _CardStackStyleInterpolator2.default.forVertical
};

var FadeInFromBottomAndroid = {
  transitionSpec: {
    duration: 350,
    easing: _reactNative.Easing.out(_reactNative.Easing.poly(5)),
    timing: _reactNative.Animated.timing
  },
  screenInterpolator: _CardStackStyleInterpolator2.default.forFadeFromBottomAndroid
};

var FadeOutToBottomAndroid = {
  transitionSpec: {
    duration: 230,
    easing: _reactNative.Easing.in(_reactNative.Easing.poly(4)),
    timing: _reactNative.Animated.timing
  },
  screenInterpolator: _CardStackStyleInterpolator2.default.forFadeFromBottomAndroid
};

function defaultTransitionConfig(transitionProps, prevTransitionProps, isModal) {
  if (_reactNative.Platform.OS === 'android') {
    if (prevTransitionProps && transitionProps.index < prevTransitionProps.index) {
      return FadeOutToBottomAndroid;
    }
    return FadeInFromBottomAndroid;
  }

  if (isModal) {
    return ModalSlideFromBottomIOS;
  }
  return SlideFromRightIOS;
}

function getTransitionConfig(transitionConfigurer, transitionProps, prevTransitionProps, isModal) {
  var defaultConfig = defaultTransitionConfig(transitionProps, prevTransitionProps, isModal);
  if (transitionConfigurer) {
    return babelHelpers.extends({}, defaultConfig, transitionConfigurer());
  }
  return defaultConfig;
}

exports.default = {
  DefaultTransitionSpec: DefaultTransitionSpec,
  defaultTransitionConfig: defaultTransitionConfig,
  getTransitionConfig: getTransitionConfig
};