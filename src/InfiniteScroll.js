'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
      typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var InfiniteScroll = (function (_Component) {
  _inherits(InfiniteScroll, _Component);

  function InfiniteScroll(props) {
    _classCallCheck(this, InfiniteScroll);

    var _this = _possibleConstructorReturn(
      this,
      (InfiniteScroll.__proto__ || Object.getPrototypeOf(InfiniteScroll)).call(
        this,
        props
      )
    );

    _this.scrollListener = _this.scrollListener.bind(_this);
    return _this;
  }

  _createClass(InfiniteScroll, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.pageLoaded = this.props.pageStart;
        this.attachScrollListener();
      }
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.attachScrollListener();
      }
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.detachScrollListener();
        this.detachMousewheelListener();
      }

      // Set a defaut loader for all your `InfiniteScroll` components
    },
    {
      key: 'setDefaultLoader',
      value: function setDefaultLoader(loader) {
        this.defaultLoader = loader;
      }
    },
    {
      key: 'detachMousewheelListener',
      value: function detachMousewheelListener() {
        var scrollEl = window;
        if (this.props.useWindow === false) {
          scrollEl = this.scrollComponent.parentNode;
        }

        scrollEl.removeEventListener(
          'mousewheel',
          this.mousewheelListener,
          this.props.useCapture
        );
      }
    },
    {
      key: 'detachScrollListener',
      value: function detachScrollListener() {
        var scrollEl = window;
        if (this.props.useWindow === false) {
          scrollEl = this.scrollComponent.parentNode;
        }

        scrollEl.removeEventListener(
          'scroll',
          this.scrollListener,
          this.props.useCapture
        );
        scrollEl.removeEventListener(
          'resize',
          this.scrollListener,
          this.props.useCapture
        );
      }
    },
    {
      key: 'attachScrollListener',
      value: function attachScrollListener() {
        if (!this.props.hasMore) {
          return;
        }

        var scrollEl = window;
        if (this.props.useWindow === false) {
          scrollEl = this.scrollComponent.parentNode;
        }

        scrollEl.addEventListener(
          'mousewheel',
          this.mousewheelListener,
          this.props.useCapture
        );
        scrollEl.addEventListener(
          'scroll',
          this.scrollListener,
          this.props.useCapture
        );
        scrollEl.addEventListener(
          'resize',
          this.scrollListener,
          this.props.useCapture
        );

        if (this.props.initialLoad) {
          this.scrollListener();
        }
      }
    },
    {
      key: 'mousewheelListener',
      value: function mousewheelListener(e) {
        // Prevents Chrome hangups
        // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
        if (e.deltaY === 1) {
          e.preventDefault();
        }
      }
    },
    {
      key: 'scrollListener',
      value: function scrollListener() {
        var el = this.scrollComponent;
        var scrollEl = window;

        var offset = void 0;
        if (this.props.useWindow) {
          var doc =
            document.documentElement ||
            document.body.parentNode ||
            document.body;
          var scrollTop =
            scrollEl.pageYOffset !== undefined
              ? scrollEl.pageYOffset
              : doc.scrollTop;
          if (this.props.isReverse) {
            offset = scrollTop;
          } else {
            offset =
              this.calculateTopPosition(el) +
              (el.offsetHeight - scrollTop - window.innerHeight);
          }
        } else if (this.props.isReverse) {
          offset = el.parentNode.scrollTop;
        } else {
          var elemTop = el.getBoundingClientRect().top - el.offsetTop
          offset = el.scrollHeight - Math.abs(elemTop) - el.parentNode.clientHeight
        }

        if (offset < Number(this.props.threshold)) {
          this.detachScrollListener();
          // Call loadMore after detachScrollListener to allow for non-async loadMore functions
          if (typeof this.props.loadMore === 'function') {
            this.props.loadMore((this.pageLoaded += 1));
          }
        }
      }
    },
    {
      key: 'calculateTopPosition',
      value: function calculateTopPosition(el) {
        if (!el) {
          return 0;
        }
        return el.offsetTop + this.calculateTopPosition(el.offsetParent);
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
          children = _props.children,
          element = _props.element,
          hasMore = _props.hasMore,
          initialLoad = _props.initialLoad,
          isReverse = _props.isReverse,
          loader = _props.loader,
          loadMore = _props.loadMore,
          pageStart = _props.pageStart,
          ref = _props.ref,
          threshold = _props.threshold,
          useCapture = _props.useCapture,
          useWindow = _props.useWindow,
          props = _objectWithoutProperties(_props, [
            'children',
            'element',
            'hasMore',
            'initialLoad',
            'isReverse',
            'loader',
            'loadMore',
            'pageStart',
            'ref',
            'threshold',
            'useCapture',
            'useWindow',
          ]);

        props.ref = function (node) {
          _this2.scrollComponent = node;
          if (ref) {
            ref(node);
          }
        };

        var childrenArray = [children];
        if (hasMore) {
          if (loader) {
            isReverse
              ? childrenArray.unshift(loader)
              : childrenArray.push(loader);
          } else if (this.defaultLoader) {
            isReverse
              ? childrenArray.unshift(this.defaultLoader)
              : childrenArray.push(this.defaultLoader);
          }
        }
        return _react2.default.createElement(element, props, childrenArray);
      }
    }
  ]);

  return InfiniteScroll;
})(_react.Component);

InfiniteScroll.propTypes = {
  children: _propTypes2.default.node.isRequired,
  element: _propTypes2.default.node,
  hasMore: _propTypes2.default.bool,
  initialLoad: _propTypes2.default.bool,
  isReverse: _propTypes2.default.bool,
  loader: _propTypes2.default.node,
  loadMore: _propTypes2.default.func.isRequired,
  pageStart: _propTypes2.default.number,
  ref: _propTypes2.default.func,
  threshold: _propTypes2.default.number,
  useCapture: _propTypes2.default.bool,
  useWindow: _propTypes2.default.bool,
};
InfiniteScroll.defaultProps = {
  element: 'div',
  hasMore: false,
  initialLoad: true,
  pageStart: 0,
  ref: null,
  threshold: 250,
  useWindow: true,
  isReverse: false,
  useCapture: false,
  loader: null,
};
exports.default = InfiniteScroll;
module.exports = exports['default'];
