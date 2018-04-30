'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var axios = require('axios');

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/* jshint esversion: 6 */

var ReactMailForm = function (_React$Component) {
    inherits(ReactMailForm, _React$Component);

    function ReactMailForm(props) {
        classCallCheck(this, ReactMailForm);

        var _this = possibleConstructorReturn(this, (ReactMailForm.__proto__ || Object.getPrototypeOf(ReactMailForm)).call(this, props));

        _this.state = {
            dataLoaded: false,
            formConfiguration: null
        };
        return _this;
    }

    createClass(ReactMailForm, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            console.log("component mounting - receiving configuration");
            /* start axios request to load configuration */
            var that = this;
            axios.axios.get(this.props.formConfigurationURL).then(function (response) {
                console.log("SUCCESS", response);
                that.setState(function () {
                    return { dataLoaded: true,
                        formConfiguration: response.data };
                });
            }).catch(function (error) {
                console.log("ERROR", error);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var dataLoaded = this.state.dataLoaded;
            if (dataLoaded) {
                return React.createElement(
                    "div",
                    null,
                    "loaded"
                );
            } else {
                return React.createElement(
                    "div",
                    null,
                    "loading"
                );
            }
        }
    }]);
    return ReactMailForm;
}(React.Component);

/* jshint esversion: 6 */
console.log("hello world");
