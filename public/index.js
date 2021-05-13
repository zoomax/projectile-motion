/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helpers/forms.ts":
/*!******************************!*\
  !*** ./src/helpers/forms.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.resetFormData = exports.validateFormValues = exports.getFormData = void 0;\nvar _1 = __webpack_require__(/*! . */ \"./src/helpers/index.ts\");\nvar validators_1 = __webpack_require__(/*! ../validators */ \"./src/validators/index.ts\");\nfunction getFormData(form) {\n    var values = {};\n    var inputs = form.querySelectorAll(\"input\");\n    inputs.forEach(function (input) { return (values[input.name] = +input.value); });\n    return values;\n}\nexports.getFormData = getFormData;\nfunction validateFormValues(data, validators) {\n    try {\n        for (var key in data) {\n            console.log(key);\n            validators_1.validate(key, data[key], validators[key]);\n        }\n        return data;\n    }\n    catch (err) {\n        _1.showError(err.message);\n    }\n}\nexports.validateFormValues = validateFormValues;\nfunction resetFormData(form) {\n    var inputs = form.querySelectorAll(\"input\");\n    inputs.forEach(function (input) { return (input.value = \"0\"); });\n}\nexports.resetFormData = resetFormData;\n\n\n//# sourceURL=webpack://nagwa-task/./src/helpers/forms.ts?");

/***/ }),

/***/ "./src/helpers/index.ts":
/*!******************************!*\
  !*** ./src/helpers/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.showError = exports.showStatus = exports.getUnit = exports.getAngleInRadiant = exports.positionLogger = exports.getYDistance = exports.getXDistance = void 0;\nvar types_1 = __webpack_require__(/*! ../types */ \"./src/types/index.ts\");\nfunction getXDistance(distance, angle) {\n    if (angle == 0)\n        return distance;\n    if (angle == 90)\n        return 0;\n    var slop = Math.cos(getAngleInRadiant(angle));\n    return distance * slop;\n}\nexports.getXDistance = getXDistance;\nfunction getYDistance(distance, angle) {\n    if (angle == 90)\n        return distance;\n    if (angle == 0)\n        return 0;\n    var slop = Math.sin(getAngleInRadiant(angle));\n    return distance * slop;\n}\nexports.getYDistance = getYDistance;\nfunction positionLogger(element, value) {\n    element.innerHTML = \"\" + value;\n}\nexports.positionLogger = positionLogger;\nfunction getAngleInRadiant(angle) {\n    return (Math.PI / 180) * angle;\n}\nexports.getAngleInRadiant = getAngleInRadiant;\nfunction getUnit(unitType) {\n    switch (unitType) {\n        case \"velocity\":\n            return types_1.Unit.VELOCITY;\n        case \"distance\":\n            return types_1.Unit.DISTANCE;\n        case \"direction\":\n            return types_1.Unit.ANGLE;\n        default:\n            return unitType;\n    }\n}\nexports.getUnit = getUnit;\nfunction showStatus(status) {\n    var x_pos = document.getElementById(\"show-x-pos\");\n    var y_pos = document.getElementById(\"show-y-pos\");\n    var direction = document.getElementById(\"show-direction\");\n    var velocity = document.getElementById(\"show-velocity\");\n    positionLogger(x_pos, status.x_position);\n    positionLogger(y_pos, status.y_position);\n    positionLogger(direction, status.direction);\n    positionLogger(velocity, status.velocity);\n}\nexports.showStatus = showStatus;\nfunction showError(error) {\n    var errorElement = document.querySelector(\".show-error\");\n    errorElement.style.display = \"block\";\n    errorElement.innerHTML = \"<p>\" + error + \"</p>\";\n    setTimeout(function () {\n        errorElement.style.display = \"none\";\n    }, 3000);\n}\nexports.showError = showError;\n\n\n//# sourceURL=webpack://nagwa-task/./src/helpers/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar helpers_1 = __webpack_require__(/*! ./helpers */ \"./src/helpers/index.ts\");\nvar forms_1 = __webpack_require__(/*! ./helpers/forms */ \"./src/helpers/forms.ts\");\nvar services_1 = __webpack_require__(/*! ./services */ \"./src/services/index.ts\");\n//elemets\nvar boxElement = document.getElementById(\"box\");\nvar resetElement = document.getElementById(\"reset\");\nvar lunchElement = document.getElementById(\"lunch\");\nvar motionDataForm = (document.getElementById(\"form\"));\n// lunching app\nmotionDataForm.addEventListener(\"submit\", handleLunch);\n// reset values\nresetElement.addEventListener(\"click\", handleReset);\n//event handlers\nfunction handleReset(e) {\n    e.preventDefault();\n    boxElement.style.left = \"0px\";\n    boxElement.style.top = \"0px\";\n    forms_1.resetFormData(motionDataForm);\n    helpers_1.showStatus({\n        velocity: 0,\n        x_position: 0,\n        y_position: 0,\n        direction: 0,\n    });\n}\nfunction handleLunch(e) {\n    e.preventDefault();\n    var formData = forms_1.validateFormValues(forms_1.getFormData(motionDataForm), {\n        velocity: {\n            min: 100,\n            max: 1000,\n        },\n        direction: {\n            min: 0,\n            max: 90,\n        },\n        distance: {\n            min: 0,\n            max: 800,\n        },\n    });\n    if (formData) {\n        lunchElement.setAttribute(\"disabled\", \"true\");\n        var id_1 = setInterval(function () {\n            var isRendering = !services_1.render(boxElement, formData, +id_1);\n            if (!isRendering) {\n                lunchElement.removeAttribute(\"disabled\");\n            }\n        }, 5);\n    }\n}\n\n\n//# sourceURL=webpack://nagwa-task/./src/index.ts?");

/***/ }),

/***/ "./src/services/index.ts":
/*!*******************************!*\
  !*** ./src/services/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.render = void 0;\nvar helpers_1 = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.ts\");\nfunction render(element, data, timer) {\n    var xDistance = helpers_1.getXDistance(data.distance, data.direction);\n    var yDistance = helpers_1.getYDistance(data.distance, data.direction);\n    var elementTop = +element.style.top.replace(\"px\", \"\");\n    var elementLeft = +element.style.left.replace(\"px\", \"\");\n    if (elementTop <= yDistance && elementLeft <= xDistance) {\n        var newElementTop = elementTop + yDistance * (data.velocity / 10000);\n        var newElementLeft = elementLeft + xDistance * (data.velocity / 10000);\n        element.style.top = newElementTop + \"px\";\n        element.style.left = newElementLeft + \"px\";\n        helpers_1.showStatus({\n            velocity: data.velocity,\n            direction: data.direction,\n            x_position: +newElementLeft.toFixed(2),\n            y_position: +newElementTop.toFixed(2),\n        });\n        return false;\n    }\n    clearInterval(timer);\n    return true;\n}\nexports.render = render;\n\n\n//# sourceURL=webpack://nagwa-task/./src/services/index.ts?");

/***/ }),

/***/ "./src/types/index.ts":
/*!****************************!*\
  !*** ./src/types/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Unit = void 0;\nvar Unit;\n(function (Unit) {\n    Unit[\"VELOCITY\"] = \"px/ms\";\n    Unit[\"ANGLE\"] = \"deg\";\n    Unit[\"DISTANCE\"] = \"px\";\n})(Unit = exports.Unit || (exports.Unit = {}));\n\n\n//# sourceURL=webpack://nagwa-task/./src/types/index.ts?");

/***/ }),

/***/ "./src/validators/index.ts":
/*!*********************************!*\
  !*** ./src/validators/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.validate = exports.getValue = void 0;\nvar helpers_1 = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.ts\");\nfunction getValue(property, element, validator) {\n    return validate(property, +element.value, validator);\n}\nexports.getValue = getValue;\n//validatores\nfunction validate(property, value, validator) {\n    var unit = helpers_1.getUnit(property);\n    var min = validator.min, max = validator.max;\n    if (min > value || value > max) {\n        throw new Error(property + \" must be in between \" + min + unit + \" and \" + max + unit);\n    }\n    return value;\n}\nexports.validate = validate;\n\n\n//# sourceURL=webpack://nagwa-task/./src/validators/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;