'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var axios = _interopDefault(require('axios'));

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

var Header = function (_React$Component) {
    inherits(Header, _React$Component);

    function Header(props) {
        classCallCheck(this, Header);
        return possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
    }

    createClass(Header, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h2",
                    null,
                    this.props.formTitle
                )
            );
        }
    }]);
    return Header;
}(React.Component);

/* jshint esversion: 6 */

var Footer = function (_React$Component) {
    inherits(Footer, _React$Component);

    function Footer(props) {
        classCallCheck(this, Footer);
        return possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));
    }

    createClass(Footer, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "p",
                    null,
                    this.props.footerText
                )
            );
        }
    }]);
    return Footer;
}(React.Component);

/* jshint esversion: 6 */

var ButtonList = function (_React$Component) {
    inherits(ButtonList, _React$Component);

    function ButtonList(props) {
        classCallCheck(this, ButtonList);
        return possibleConstructorReturn(this, (ButtonList.__proto__ || Object.getPrototypeOf(ButtonList)).call(this, props));
    }

    createClass(ButtonList, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "button",
                    { type: "button", className: "btn btn-default", onClick: this.props.submitHandler },
                    "Submit"
                ),
                " \xA0",
                React.createElement(
                    "button",
                    { type: "button", className: "btn btn-cancel" },
                    "Cancel"
                )
            );
        }
    }]);
    return ButtonList;
}(React.Component);

/* jshint esversion: 6 */

var MainFormContent = function (_React$Component) {
    inherits(MainFormContent, _React$Component);

    function MainFormContent(props) {
        classCallCheck(this, MainFormContent);
        return possibleConstructorReturn(this, (MainFormContent.__proto__ || Object.getPrototypeOf(MainFormContent)).call(this, props));
    }

    createClass(MainFormContent, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var formData = null;
            formData = Object.keys(this.props.content).map(function (i) {
                console.log(i);
                var objectData = _this2.props.content[i];
                var isRequired = objectData["required"];
                var outData = null;
                switch (objectData["type"]) {
                    case "checkbox_array":
                        var checkbox_array_data = objectData.options.map(function (j) {
                            var isChecked = false;
                            if (_this2.props.formState[i].indexOf(j) > -1) {
                                isChecked = true;
                            }
                            return React.createElement(
                                "div",
                                { key: j, className: "col-md-4" },
                                React.createElement("input", { type: "checkbox", name: i + "[]", value: j,
                                    defaultChecked: isChecked,
                                    onChange: function onChange(e) {
                                        _this2.props.changeHandler(i, "checkbox_array", e.target.value);
                                    } }),
                                " ",
                                j
                            );
                        });
                        outData = React.createElement(
                            "div",
                            { id: i },
                            checkbox_array_data
                        );
                        break;
                    case "textarea":
                        outData = React.createElement(
                            "div",
                            { id: i },
                            React.createElement("textarea", { rows: objectData["rows"], cols: objectData["cols"],
                                defaultValue: _this2.props.formState[i],
                                onChange: function onChange(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    _this2.props.changeHandler(i, "textarea", e.target.value);
                                }, required: isRequired })
                        );
                        break;
                    case "text":
                        outData = React.createElement(
                            "div",
                            { id: i },
                            React.createElement("input", { type: objectData["type"], width: objectData["maxwidth"],
                                defaultValue: _this2.props.formState[i],
                                onChange: function onChange(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    _this2.props.changeHandler(i, "text", e.target.value);
                                }, required: isRequired })
                        );
                        break;
                }
                return React.createElement(
                    "div",
                    { key: i, className: "form-group " + ("col-md-" + objectData["btcolumns"]) },
                    React.createElement(
                        "label",
                        { htmlFor: i },
                        i,
                        " ",
                        isRequired ? "*" : ""
                    ),
                    outData
                );
            });
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { id: this.props.formID },
                    formData
                )
            );
        }
    }]);
    return MainFormContent;
}(React.Component);

/* jshint esversion: 6 */

var Notification = function (_React$Component) {
    inherits(Notification, _React$Component);

    function Notification(props) {
        classCallCheck(this, Notification);
        return possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));
    }

    createClass(Notification, [{
        key: "render",
        value: function render() {
            console.log(this.props);
            if (!this.props.visible) {
                return null;
            }
            return React.createElement(
                "div",
                { className: this.props.notificationClasses },
                React.createElement(
                    "strong",
                    null,
                    this.props.notificationText
                )
            );
        }
    }]);
    return Notification;
}(React.Component);

/* jshint esversion: 6 */

var ReactMailForm = function (_React$Component) {
    inherits(ReactMailForm, _React$Component);

    function ReactMailForm(props) {
        classCallCheck(this, ReactMailForm);

        var _this = possibleConstructorReturn(this, (ReactMailForm.__proto__ || Object.getPrototypeOf(ReactMailForm)).call(this, props));

        _this.state = {
            dataLoaded: false,
            notificationVisible: false,
            notificationClass: "",
            notificationText: "",
            formConfiguration: null
        };
        _this._changeHandler = _this._changeHandler.bind(_this);
        _this._submitHandler = _this._submitHandler.bind(_this);
        _this._addElement = _this._addElement.bind(_this);
        return _this;
    }

    createClass(ReactMailForm, [{
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
            e.stopPropagation();

            // perform some basic validation
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
                }).catch(function (error) {
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
                document.querySelectorAll("#" + this.state.formConfiguration.formID + " :invalid").forEach(function (node) {
                    node.classList.add("invalidInputElement");
                });
                window.setTimeout(function () {
                    document.querySelectorAll("#" + _this2.state.formConfiguration.formID + " :invalid").forEach(function (node) {
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
                    if (typeof response.data.content[c].default !== "undefined") {
                        content[c] = response.data.content[c].default;
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
                        }
                    }
                });
                _this3.setState(function () {
                    return { content: content };
                });
                _this3.setState(function () {
                    return { dataLoaded: true,
                        formConfiguration: response.data };
                });
            }).catch(function (error) {
                console.log("ERROR", error);
            });
        }
    }, {
        key: "_addElement",
        value: function _addElement() {
            console.log("button clicky");
            //ToDo: be able to add elements of other types than text
            this.setState(function (previousState) {
                var newFormConfiguration = Object.assign({}, previousState.formConfiguration);
                var newContent = Object.assign({}, previousState.content);
                newFormConfiguration.content["test_element"] = {
                    "type": "text",
                    "maxwidth": 30,
                    "btcolumns": 6,
                    "default": "Test Element",
                    "required": true
                };
                newContent["test_element"] = "";
                return {
                    formConfiguration: newFormConfiguration,
                    content: newContent
                };
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var dataLoaded = this.state.dataLoaded;
            if (dataLoaded) {
                var _state$formConfigurat = this.state.formConfiguration,
                    formTitle = _state$formConfigurat.formTitle,
                    footerText = _state$formConfigurat.footerText,
                    content = _state$formConfigurat.content;

                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "button",
                        { onClick: function onClick(e) {
                                e.preventDefault();
                                e.stopPropagation();
                                _this4._addElement();
                            } },
                        "BTN"
                    ),
                    React.createElement(Header, { formTitle: formTitle }),
                    React.createElement(MainFormContent, { content: content, formState: this.state.content, formID: this.state.formConfiguration.formID, changeHandler: this._changeHandler }),
                    React.createElement(ButtonList, { submitHandler: this._submitHandler }),
                    React.createElement(Notification, {
                        visible: this.state.notificationVisible,
                        notificationClasses: this.state.notificationClass,
                        notificationText: this.state.notificationText }),
                    React.createElement(Footer, { footerText: footerText })
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

module.exports = ReactMailForm;
