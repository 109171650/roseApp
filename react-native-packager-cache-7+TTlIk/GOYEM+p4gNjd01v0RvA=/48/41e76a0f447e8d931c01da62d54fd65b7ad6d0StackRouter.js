Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = babelHelpers.interopRequireDefault(_pathToRegexp);

var _NavigationActions = require('../NavigationActions');

var _NavigationActions2 = babelHelpers.interopRequireDefault(_NavigationActions);

var _createConfigGetter = require('./createConfigGetter');

var _createConfigGetter2 = babelHelpers.interopRequireDefault(_createConfigGetter);

var _getScreenForRouteName = require('./getScreenForRouteName');

var _getScreenForRouteName2 = babelHelpers.interopRequireDefault(_getScreenForRouteName);

var _StateUtils = require('../StateUtils');

var _StateUtils2 = babelHelpers.interopRequireDefault(_StateUtils);

var _validateRouteConfigMap = require('./validateRouteConfigMap');

var _validateRouteConfigMap2 = babelHelpers.interopRequireDefault(_validateRouteConfigMap);

var _getScreenConfigDeprecated = require('./getScreenConfigDeprecated');

var _getScreenConfigDeprecated2 = babelHelpers.interopRequireDefault(_getScreenConfigDeprecated);

var uniqueBaseId = 'id-' + Date.now();
var uuidCount = 0;
function _getUuid() {
  return uniqueBaseId + '-' + uuidCount++;
}

exports.default = function (routeConfigs) {
  var stackConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  (0, _validateRouteConfigMap2.default)(routeConfigs);

  var childRouters = {};
  var routeNames = Object.keys(routeConfigs);

  routeNames.forEach(function (routeName) {
    var screen = (0, _getScreenForRouteName2.default)(routeConfigs, routeName);
    if (screen && screen.router) {
      childRouters[routeName] = screen.router;
    } else {
      childRouters[routeName] = null;
    }
  });

  var initialRouteParams = stackConfig.initialRouteParams;


  var initialRouteName = stackConfig.initialRouteName || routeNames[0];

  var initialChildRouter = childRouters[initialRouteName];
  var paths = stackConfig.paths || {};

  routeNames.forEach(function (routeName) {
    var pathPattern = paths[routeName] || routeConfigs[routeName].path;
    var matchExact = !!pathPattern && !childRouters[routeName];
    if (typeof pathPattern !== 'string') {
      pathPattern = routeName;
    }
    var keys = [];
    var re = (0, _pathToRegexp2.default)(pathPattern, keys);
    if (!matchExact) {
      var wildcardRe = (0, _pathToRegexp2.default)(pathPattern + '/*', keys);
      re = new RegExp('(?:' + re.source + ')|(?:' + wildcardRe.source + ')');
    }

    paths[routeName] = { re: re, keys: keys, toPath: _pathToRegexp2.default.compile(pathPattern) };
  });

  return {
    getComponentForState: function getComponentForState(state) {
      var activeChildRoute = state.routes[state.index];
      var routeName = activeChildRoute.routeName;

      if (childRouters[routeName]) {
        return childRouters[routeName].getComponentForState(activeChildRoute);
      }
      return (0, _getScreenForRouteName2.default)(routeConfigs, routeName);
    },
    getComponentForRouteName: function getComponentForRouteName(routeName) {
      return (0, _getScreenForRouteName2.default)(routeConfigs, routeName);
    },
    getStateForAction: function getStateForAction(passedAction, state) {
      var action = _NavigationActions2.default.mapDeprecatedActionAndWarn(passedAction);

      if (!state) {
        var route = {};
        if (action.type === _NavigationActions2.default.NAVIGATE && childRouters[action.routeName] !== undefined) {
          return {
            index: 0,
            routes: [babelHelpers.extends({}, action, {
              type: undefined,
              key: 'Init'
            })]
          };
        }
        if (initialChildRouter) {
          route = initialChildRouter.getStateForAction(_NavigationActions2.default.navigate({
            routeName: initialRouteName,
            params: initialRouteParams
          }));
        }
        var params = (route.params || action.params || initialRouteParams) && babelHelpers.extends({}, route.params || {}, action.params || {}, initialRouteParams || {});
        route = babelHelpers.extends({}, route, {
          routeName: initialRouteName,
          key: 'Init'
        }, params ? { params: params } : {});

        state = {
          index: 0,
          routes: [route]
        };
      }

      if (action.type !== _NavigationActions2.default.RESET || action.key !== null) {
        var keyIndex = action.key ? _StateUtils2.default.indexOf(state, action.key) : -1;
        var childIndex = keyIndex >= 0 ? keyIndex : state.index;
        var childRoute = state.routes[childIndex];
        var childRouter = childRouters[childRoute.routeName];
        if (childRouter) {
          var _route = childRouter.getStateForAction(action, childRoute);
          if (_route === null) {
            return state;
          }
          if (_route && _route !== childRoute) {
            return _StateUtils2.default.replaceAt(state, childRoute.key, _route);
          }
        }
      }

      if (action.type === _NavigationActions2.default.NAVIGATE && childRouters[action.routeName] !== undefined) {
        var _childRouter = childRouters[action.routeName];
        var _route2 = void 0;
        if (_childRouter) {
          var childAction = action.action || _NavigationActions2.default.init({ params: action.params });
          _route2 = babelHelpers.extends({
            params: action.params
          }, _childRouter.getStateForAction(childAction), {
            key: _getUuid(),
            routeName: action.routeName
          });
        } else {
          _route2 = {
            params: action.params,
            key: _getUuid(),
            routeName: action.routeName
          };
        }
        return _StateUtils2.default.push(state, _route2);
      }

      if (action.type === _NavigationActions2.default.NAVIGATE) {
        var childRouterNames = Object.keys(childRouters);
        for (var i = 0; i < childRouterNames.length; i++) {
          var childRouterName = childRouterNames[i];
          var _childRouter2 = childRouters[childRouterName];
          if (_childRouter2) {
            var initChildRoute = _childRouter2.getStateForAction(_NavigationActions2.default.init());

            var navigatedChildRoute = _childRouter2.getStateForAction(action, initChildRoute);
            var routeToPush = null;
            if (navigatedChildRoute === null) {
              routeToPush = initChildRoute;
            } else if (navigatedChildRoute !== initChildRoute) {
              routeToPush = navigatedChildRoute;
            }
            if (routeToPush) {
              return _StateUtils2.default.push(state, babelHelpers.extends({}, routeToPush, {
                key: _getUuid(),
                routeName: childRouterName
              }));
            }
          }
        }
      }

      if (action.type === _NavigationActions2.default.SET_PARAMS) {
        var lastRoute = state.routes.find(function (route) {
          return route.key === action.key;
        });
        if (lastRoute) {
          var _params = babelHelpers.extends({}, lastRoute.params, action.params);
          var routes = [].concat(babelHelpers.toConsumableArray(state.routes));
          routes[state.routes.indexOf(lastRoute)] = babelHelpers.extends({}, lastRoute, {
            params: _params
          });
          return babelHelpers.extends({}, state, {
            routes: routes
          });
        }
      }

      if (action.type === _NavigationActions2.default.RESET) {
        var resetAction = action;

        return babelHelpers.extends({}, state, {
          routes: resetAction.actions.map(function (childAction, index) {
            var router = childRouters[childAction.routeName];
            if (router) {
              return babelHelpers.extends({}, childAction, router.getStateForAction(childAction), {
                routeName: childAction.routeName,
                key: 'Init' + index
              });
            }
            var route = babelHelpers.extends({}, childAction, {
              key: 'Init' + index
            });
            delete route.type;
            return route;
          }),
          index: action.index
        });
      }

      if (action.type === _NavigationActions2.default.BACK) {
        var backRouteIndex = null;
        if (action.key) {
          var backRoute = state.routes.find(function (route) {
            return route.key === action.key;
          });

          backRouteIndex = state.routes.indexOf(backRoute);
        }
        if (backRouteIndex == null) {
          return _StateUtils2.default.pop(state);
        }
        if (backRouteIndex > 0) {
          return babelHelpers.extends({}, state, {
            routes: state.routes.slice(0, backRouteIndex),
            index: backRouteIndex - 1
          });
        }
      }
      return state;
    },
    getPathAndParamsForState: function getPathAndParamsForState(state) {
      var route = state.routes[state.index];
      var routeName = route.routeName;
      var screen = (0, _getScreenForRouteName2.default)(routeConfigs, routeName);

      var subPath = paths[routeName].toPath(route.params);
      var path = subPath;
      var params = route.params;
      if (screen && screen.router) {
        var child = screen.router.getPathAndParamsForState(route);
        path = subPath ? subPath + '/' + child.path : child.path;
        params = child.params ? babelHelpers.extends({}, params, child.params) : params;
      }
      return {
        path: path,
        params: params
      };
    },
    getActionForPathAndParams: function getActionForPathAndParams(pathToResolve) {
      if (!pathToResolve) {
        return _NavigationActions2.default.navigate({
          routeName: initialRouteName
        });
      }

      var _pathToResolve$split = pathToResolve.split('?'),
          _pathToResolve$split2 = babelHelpers.slicedToArray(_pathToResolve$split, 2),
          pathNameToResolve = _pathToResolve$split2[0],
          queryString = _pathToResolve$split2[1];

      var matchedRouteName = void 0;
      var pathMatch = void 0;
      var pathMatchKeys = void 0;

      for (var _iterator = Object.entries(paths), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();;) {
        var _ref3;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref3 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref3 = _i.value;
        }

        var _ref = _ref3;

        var _ref2 = babelHelpers.slicedToArray(_ref, 2);

        var routeName = _ref2[0];
        var path = _ref2[1];
        var re = path.re,
            keys = path.keys;

        pathMatch = re.exec(pathNameToResolve);
        if (pathMatch && pathMatch.length) {
          pathMatchKeys = keys;
          matchedRouteName = routeName;
          break;
        }
      }

      if (!matchedRouteName) {
        return null;
      }

      var nestedAction = void 0;
      if (childRouters[matchedRouteName]) {
        nestedAction = childRouters[matchedRouteName].getActionForPathAndParams(pathMatch.slice(pathMatchKeys.length).join('/'));
      }

      var queryParams = (queryString || '').split('&').reduce(function (result, item) {
        if (item !== '') {
          var nextResult = result || {};

          var _item$split = item.split('='),
              _item$split2 = babelHelpers.slicedToArray(_item$split, 2),
              key = _item$split2[0],
              value = _item$split2[1];

          nextResult[key] = value;
          return nextResult;
        }
        return result;
      }, null);

      var params = pathMatch.slice(1).reduce(function (result, matchResult, i) {
        var key = pathMatchKeys[i];
        if (key.asterisk || !key) {
          return result;
        }
        var nextResult = result || {};
        var paramName = key.name;
        nextResult[paramName] = matchResult;
        return nextResult;
      }, queryParams);

      return _NavigationActions2.default.navigate(babelHelpers.extends({
        routeName: matchedRouteName
      }, params ? { params: params } : {}, nestedAction ? { action: nestedAction } : {}));
    },


    getScreenOptions: (0, _createConfigGetter2.default)(routeConfigs, stackConfig.navigationOptions),

    getScreenConfig: _getScreenConfigDeprecated2.default
  };
};