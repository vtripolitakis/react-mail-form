'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var axios = _interopDefault(require('axios'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var Header =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _getPrototypeOf(Header).call(this, props));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement("h2", null, this.props.formTitle));
    }
  }]);

  return Header;
}(React.Component);

var Footer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer(props) {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Footer).call(this, props));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement("p", null, this.props.footerText));
    }
  }]);

  return Footer;
}(React.Component);

var ButtonList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ButtonList, _React$Component);

  function ButtonList(props) {
    _classCallCheck(this, ButtonList);

    return _possibleConstructorReturn(this, _getPrototypeOf(ButtonList).call(this, props));
  }

  _createClass(ButtonList, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement("button", {
        type: "button",
        className: "btn btn-default",
        onClick: this.props.submitHandler
      }, "Submit"), " \xA0", React.createElement("button", {
        type: "button",
        className: "btn btn-cancel"
      }, "Cancel"));
    }
  }]);

  return ButtonList;
}(React.Component);

var MainFormContent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MainFormContent, _React$Component);

  function MainFormContent(props) {
    _classCallCheck(this, MainFormContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(MainFormContent).call(this, props));
  }

  _createClass(MainFormContent, [{
    key: "render",
    value: function render() {
      var _this = this;

      var formData = null;
      formData = Object.keys(this.props.content).map(function (i) {
        var objectData = _this.props.content[i];
        var isRequired = objectData["required"];
        var outData = null;

        switch (objectData["type"]) {
          case "checkbox_array":
            var checkbox_array_data = objectData.options.map(function (j) {
              var isChecked = false;

              if (_this.props.formState[i].indexOf(j) > -1) {
                isChecked = true;
              }

              return React.createElement("div", {
                key: j,
                className: "col-md-4"
              }, React.createElement("input", {
                type: "checkbox",
                name: i + "[]",
                value: j,
                defaultChecked: isChecked,
                onChange: function onChange(e) {
                  _this.props.changeHandler(i, "checkbox_array", e.target.value);
                }
              }), " ", j);
            });
            outData = React.createElement("div", {
              id: i
            }, checkbox_array_data);
            break;

          case "select":
            var currentOptionSelected = false;
            var select_data = objectData.options.map(function (j) {
              if (typeof objectData["default"] !== "undefined") {
                if (objectData["default"] === j) {
                  currentOptionSelected = true;
                } else {
                  currentOptionSelected = false;
                }
              }

              return React.createElement("option", {
                key: j,
                selected: currentOptionSelected
              }, j);
            });
            select_data.unshift(React.createElement("option", {
              disabled: true,
              selected: !currentOptionSelected,
              key: "please select",
              value: ""
            }, "Please Select"));
            outData = React.createElement("div", {
              id: i
            }, React.createElement("select", {
              required: isRequired,
              onChange: function onChange(e) {
                _this.props.changeHandler(i, "select", e.target.value);
              }
            }, select_data));
            break;

          case "textarea":
            outData = React.createElement("div", {
              id: i
            }, React.createElement("textarea", {
              rows: objectData["rows"],
              cols: objectData["cols"],
              defaultValue: _this.props.formState[i],
              onChange: function onChange(e) {
                e.preventDefault();
                e.stopPropagation();

                _this.props.changeHandler(i, "textarea", e.target.value);
              },
              required: isRequired
            }));
            break;

          case "text":
            outData = React.createElement("div", {
              id: i
            }, React.createElement("input", {
              type: objectData["type"],
              width: objectData["maxwidth"],
              defaultValue: _this.props.formState[i],
              onChange: function onChange(e) {
                e.preventDefault();
                e.stopPropagation();

                _this.props.changeHandler(i, "text", e.target.value);
              },
              required: isRequired
            }));
            break;
        }

        var label = "";

        if (typeof _this.props.content[i]["label"] === "undefined") {
          label = i;
        } else {
          label = _this.props.content[i]["label"];
        }

        return React.createElement("div", {
          key: i,
          className: "form-group " + "col-md-".concat(objectData["btcolumns"])
        }, React.createElement("label", {
          htmlFor: i
        }, label, " ", isRequired ? "*" : ""), outData);
      });
      return React.createElement("div", null, React.createElement("form", {
        id: this.props.formID
      }, formData));
    }
  }]);

  return MainFormContent;
}(React.Component);

var Notification =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Notification, _React$Component);

  function Notification(props) {
    _classCallCheck(this, Notification);

    return _possibleConstructorReturn(this, _getPrototypeOf(Notification).call(this, props));
  }

  _createClass(Notification, [{
    key: "render",
    value: function render() {
      console.log(this.props);

      if (!this.props.visible) {
        return null;
      }

      return React.createElement("div", {
        className: this.props.notificationClasses
      }, React.createElement("strong", null, this.props.notificationText));
    }
  }]);

  return Notification;
}(React.Component);

require('es6-promise').polyfill();

var ReactMailForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactMailForm, _React$Component);

  function ReactMailForm(props) {
    var _this;

    _classCallCheck(this, ReactMailForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactMailForm).call(this, props));
    _this.state = {
      dataLoaded: false,
      notificationVisible: false,
      notificationClass: "",
      notificationText: "",
      formConfiguration: null
    };
    _this._changeHandler = _this._changeHandler.bind(_assertThisInitialized(_this));
    _this._submitHandler = _this._submitHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ReactMailForm, [{
    key: "_changeHandler",
    value: function _changeHandler(i, type, e) {
      this.setState(function (previousState) {
        var newState = Object.assign({}, previousState);

        switch (type) {
          case "text":
            newState.content[i] = e;
            break;

          case "textarea":
            newState.content[i] = e;
            break;

          case "select":
            newState.content[i] = e;
            break;

          case "checkbox_array":
            //check if it exists and delete otherwise add
            var idx = newState.content[i].indexOf(e);

            if (idx > -1) {
              newState.content[i].splice(idx, 1);
            } else {
              newState.content[i].push(e);
            }

        }

        return newState;
      });
    }
  }, {
    key: "_submitHandler",
    value: function _submitHandler(e) {
      var _this2 = this;

      /* start axios request to submit form data */
      e.preventDefault();
      e.stopPropagation(); // perform some basic validation

      if (document.getElementById(this.state.formConfiguration.formID).reportValidity()) {
        axios.post(this.state.formConfiguration.endpoint, this.state.content, {
          headers: {
            "Content-Type": "application/json"
          }
        }).then(function (response) {
          console.log(response.data);

          _this2.setState(function (previousState) {
            console.log(previousState);
            return {
              notificationVisible: true,
              notificationClass: previousState.formConfiguration.successMessageClass,
              notificationText: previousState.formConfiguration.successMessage
            };
          });

          window.setTimeout(function () {
            _this2.setState(function () {
              return {
                notificationVisible: false,
                notificationClass: "",
                notificationText: ""
              };
            });
          }, 3500);
        })["catch"](function (error) {
          _this2.setState(function (previousState) {
            console.log(previousState);
            return {
              notificationVisible: true,
              notificationClass: previousState.formConfiguration.errorMessageClass,
              notificationText: previousState.formConfiguration.errorMessage
            };
          });

          window.setTimeout(function () {
            _this2.setState(function () {
              return {
                notificationVisible: false,
                notificationClass: "",
                notificationText: ""
              };
            });
          }, 3500);
        });
      } else {
        document.querySelectorAll("#".concat(this.state.formConfiguration.formID, " :invalid")).forEach(function (node) {
          node.classList.add("invalidInputElement");
        });
        window.setTimeout(function () {
          document.querySelectorAll("#".concat(_this2.state.formConfiguration.formID, " :invalid")).forEach(function (node) {
            node.classList.remove("invalidInputElement");
          });
        }, 1000);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      /* start axios request to load configuration */
      axios.get(this.props.formConfigurationURL).then(function (response) {
        // get all fields and add their default data
        var content = {};
        Object.keys(response.data.content).map(function (c) {
          if (typeof response.data.content[c]["default"] !== "undefined") {
            content[c] = response.data.content[c]["default"];
          } else {
            //ToDo: check type and update accordingly
            switch (response.data.content[c].type) {
              case "text":
                content[c] = "";
                break;

              case "textarea":
                content[c] = "";
                break;

              case "checkbox_array":
                //check if it exists and delete otherwise add
                content[c] = [];
                break;

              case "select":
                content[c] = "";
                break;
            }
          }
        });

        _this3.setState(function () {
          return {
            content: content
          };
        });

        _this3.setState(function () {
          return {
            dataLoaded: true,
            formConfiguration: response.data
          };
        });
      })["catch"](function (error) {
        console.log("ERROR", error);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var dataLoaded = this.state.dataLoaded;

      if (dataLoaded) {
        var _this$state$formConfi = this.state.formConfiguration,
            formTitle = _this$state$formConfi.formTitle,
            footerText = _this$state$formConfi.footerText,
            content = _this$state$formConfi.content;
        return React.createElement("div", null, React.createElement(Header, {
          formTitle: formTitle
        }), React.createElement(MainFormContent, {
          content: content,
          formState: this.state.content,
          formID: this.state.formConfiguration.formID,
          changeHandler: this._changeHandler
        }), React.createElement(ButtonList, {
          submitHandler: this._submitHandler
        }), React.createElement(Notification, {
          visible: this.state.notificationVisible,
          notificationClasses: this.state.notificationClass,
          notificationText: this.state.notificationText
        }), React.createElement(Footer, {
          footerText: footerText
        }));
      } else {
        return React.createElement("div", null, "loading");
      }
    }
  }]);

  return ReactMailForm;
}(React.Component);

module.exports = ReactMailForm;
