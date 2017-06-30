var form =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wonderform = __webpack_require__(1);

module.exports = function (selector) {
    var htmlForms = document.querySelectorAll(selector);
    var wonderforms = [];
    htmlForms.forEach(function (f) {
        wonderforms.push(new _wonderform.WonderForm(f));
    });
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WonderForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _field = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WonderForm = exports.WonderForm = function () {
    function WonderForm(htmlForm) {
        var _this = this;

        _classCallCheck(this, WonderForm);

        this.htmlForm = htmlForm;
        this.htmlInputs = findChildrenInputs(htmlForm);
        this.fields = {};
        this.htmlInputs.forEach(function (i) {
            var field = new _field.Field(i);
            _this.fields[field.name] = field;
        });
        this.htmlForm.addEventListener("submit", function (e) {
            _this.submit();
            e.preventDefault();
        });
    }

    _createClass(WonderForm, [{
        key: "submit",
        value: function submit() {
            if (!this.validate()) {
                return;
            }
            var data = this.getData();
            var consoleString = "";
            for (var fieldKey in data) {
                consoleString += "Field: " + fieldKey + ", Value: " + data[fieldKey];
                consoleString += "\n";
            }

            console.log(consoleString);
        }
    }, {
        key: "validate",
        value: function validate() {
            var isValid = true;
            for (var field in this.fields) {
                var fieldValue = this.fields[field];
                isValid = fieldValue.validate() && isValid;
            }

            return isValid;
        }
    }, {
        key: "getData",
        value: function getData() {
            var data = {};
            for (var fieldKey in this.fields) {
                var field = this.fields[fieldKey];
                data[fieldKey] = field.getValue();
            }
            return data;
        }
    }]);

    return WonderForm;
}();

function findChildrenInputs(node) {
    var inputs = [];
    var nodeChildren = node.children;
    for (var i = 0; i < nodeChildren.length; i++) {
        var child = nodeChildren[i];
        if (child.tagName === "INPUT") {
            inputs.push(child);
        } else {
            inputs = inputs.concat(findChildrenInputs(child));
        }
    }
    return inputs;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Field = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validators = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = exports.Field = function () {
    function Field(htmlInput) {
        _classCallCheck(this, Field);

        this.htmlInput = htmlInput;
        this.name = this.htmlInput.getAttribute("name");
        this.validators = (0, _validators.validators)(this.htmlInput);
        this.errors = null;
        this.formGroup = this.htmlInput.parentElement;
    }

    _createClass(Field, [{
        key: "validate",
        value: function validate() {
            this.errors = null;
            var value = this.htmlInput.value;
            var errorMessageArr = [];
            for (var validatorName in this.validators) {
                var validator = this.validators[validatorName];
                if (!validator.validate(value)) {
                    this.errors = this.errors || {};
                    this.errors[validatorName] = validator.message;
                    errorMessageArr.push(validator.message);
                }
            }
            var isValid = this.errors === null;
            if (!isValid) {
                addClass(this.formGroup, "has-error");
                this.addError(errorMessageArr.join("\n"));
            } else {
                removeClass(this.formGroup, "has-error");
                this.removeError();
            }
            return isValid;
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return this.htmlInput.value;
        }
    }, {
        key: "addError",
        value: function addError(message) {
            if (!this.errorElem) {
                var p = document.createElement("p");
                p.className = "bg-danger";
                this.errorElem = p;
            }
            this.errorElem.textContent = message;
            this.formGroup.appendChild(this.errorElem);
        }
    }, {
        key: "removeError",
        value: function removeError() {
            if (!this.errorElem) {
                return;
            }
            this.formGroup.removeChild(this.errorElem);
            this.errorElem = null;
        }
    }]);

    return Field;
}();

function addClass(elm, className) {
    if (!elm.className.includes(className)) {
        elm.className += " " + className;
    }
}

function removeClass(elm, className) {
    elm.className = elm.className.replace(className, "");
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validators = validators;

var _name = __webpack_require__(4);

var _required = __webpack_require__(5);

var _email = __webpack_require__(6);

var _date = __webpack_require__(7);

var _minLength = __webpack_require__(8);

var registeredValidators = [_name.NameValidator, _required.RequiredValidator, _email.EmailValidator, _date.DateValidator, _minLength.MinLengthValidator];

function validators(input) {
    var validators = {};
    registeredValidators.forEach(function (v) {
        if (input.hasAttribute(v.validatorName)) {
            var option = input.getAttribute(v.validatorName);
            validators[v.validatorName] = new v(option);
        }
    });
    return validators;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NameValidator = exports.NameValidator = function () {
    _createClass(NameValidator, null, [{
        key: "validatorName",
        get: function get() {
            return "user-name";
        }
    }]);

    function NameValidator(option) {
        _classCallCheck(this, NameValidator);

        this.message = "Field must have first and last name.";
    }

    _createClass(NameValidator, [{
        key: "validate",
        value: function validate(value) {
            if (!value) {
                return true;
            }
            return (/^\w+\s+\w+/.test(value)
            );
        }
    }]);

    return NameValidator;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequiredValidator = exports.RequiredValidator = function () {
    _createClass(RequiredValidator, null, [{
        key: "validatorName",
        get: function get() {
            return "required";
        }
    }]);

    function RequiredValidator(option) {
        _classCallCheck(this, RequiredValidator);

        this.message = "Field is required.";
    }

    _createClass(RequiredValidator, [{
        key: "validate",
        value: function validate(value) {
            return value !== undefined && value !== null && value.length > 0;
        }
    }]);

    return RequiredValidator;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var EmailValidator = exports.EmailValidator = function () {
    _createClass(EmailValidator, null, [{
        key: "validatorName",
        get: function get() {
            return "email";
        }
    }]);

    function EmailValidator(option) {
        _classCallCheck(this, EmailValidator);

        this.message = "Must be a valid email.";
    }

    _createClass(EmailValidator, [{
        key: "validate",
        value: function validate(value) {
            if (!value) {
                return true;
            }
            return emailRegEx.test(value);
        }
    }]);

    return EmailValidator;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var datePreRegEx = /^(0[1-9]|1[0-2])\/[0-9]{2}\/[0-9]{4}$/;

var DateValidator = exports.DateValidator = function () {
    _createClass(DateValidator, null, [{
        key: "validatorName",
        get: function get() {
            return "date";
        }
    }]);

    function DateValidator(option) {
        _classCallCheck(this, DateValidator);

        this.message = "Not a valid date. MM/DD/YYYY";
    }

    _createClass(DateValidator, [{
        key: "validate",
        value: function validate(value) {
            if (!value) {
                return true;
            }

            if (!datePreRegEx.test(value)) {
                return false;
            }

            var components = value.split("/");
            var month = parseInt(components[0]);
            var day = parseInt(components[1]);
            var year = parseInt(components[2]);
            return validDayOfYear(month, day, year);
        }
    }]);

    return DateValidator;
}();

function validDayOfYear(month, day, year) {
    var maxDay = 31;
    if (month === 2) {
        if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
            maxDay = 29;
        } else {
            maxDay = 28;
        }
    } else if (month % 2 !== 0 && month < 8 || month % 2 === 0 && month > 7) {
        maxDay = 30;
    }
    return day <= maxDay;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MinLengthValidator = exports.MinLengthValidator = function () {
    _createClass(MinLengthValidator, null, [{
        key: "validatorName",
        get: function get() {
            return "min-length";
        }
    }]);

    function MinLengthValidator(option) {
        _classCallCheck(this, MinLengthValidator);

        this.minLength = parseInt(option);
        this.message = "Field must be at least " + option + " characters.";
    }

    _createClass(MinLengthValidator, [{
        key: "validate",
        value: function validate(value) {
            if (!value) {
                return true;
            }
            return value.length >= this.minLength;
        }
    }]);

    return MinLengthValidator;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=wonderform.js.map