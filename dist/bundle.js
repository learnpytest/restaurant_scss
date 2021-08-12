/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack_test/./src/scss/main.scss?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ (() => {

eval("// 變數\r\nconst formControl = document.querySelector(\"#form-control\");\r\nconst formParts = formControl.querySelectorAll(\".part\");\r\nconst stepControl = document.querySelector(\"#stepper-control\");\r\nconst steps = stepControl.querySelectorAll(\".step\");\r\nconst formBtnControl = document.querySelector(\"#form__button-control\");\r\nconst nextBtn = formBtnControl.querySelector(\r\n  \".form__button-control__button--primary\"\r\n);\r\nconst prevBtn = formBtnControl.querySelector(\r\n  \".form__button-control__button--outline\"\r\n);\r\n\r\nlet step = 0;\r\nlet currentShipmentFee = 0\r\n\r\nconst chartGoodsList = document.querySelector('#chart-goods-list')\r\n\r\n//運送方式\r\nconst trMethods = document.querySelector('#tr-methods')\r\nconst allTransportMethods = document.querySelectorAll(\r\n  'input[name=\"tr-method\"]'\r\n);\r\n\r\n//data\r\nconst shipments = {\r\n  'standard': 0,\r\n  'dhl': 500,\r\n}\r\nlet currentShipment = {\r\n  name: 'standard',\r\n}\r\n\r\nlet goodsInChart = [\r\n  {\r\n    id: 1,\r\n    name: \"破壞補釘修身牛仔褲\",\r\n    quantityInChart: 1,\r\n    price: 3999,\r\n    total: 3999,\r\n    image: \"http://i.imgur.com/RqUqDdu.png\",\r\n  },\r\n  {\r\n    id: 2,\r\n    name: \"刷色直筒牛仔褲\",\r\n    quantityInChart: 1,\r\n    price: 1299,\r\n    total: 1299,\r\n    image: \"http://i.imgur.com/sBqwY45.png\",\r\n  }\r\n]\r\n\r\n//選擇數量\r\nfunction onGoodCountClicked({target}) {\r\n const id = getId(target)\r\n updateCount(target)(id)\r\n updateTotal(id)\r\n generateChartGoods()\r\n showSum()\r\n}\r\nfunction showSum () {\r\n  let sum = 0\r\n  const goodSum = document.querySelector('#good-sum')\r\n  goodsInChart.forEach(item => sum += item.total)\r\n  goodSum.textContent = '$' + (sum + shipments[currentShipment.name])\r\n}\r\n\r\nfunction updateTotal(id){\r\n  let total = 0\r\n  goodsInChart.forEach(item => {\r\n    item.total = item.id === id ? item.quantityInChart * item.price : item.total\r\n    total = item.total\r\n  })\r\n  return total\r\n}\r\n\r\nfunction updateCount (target) {\r\n  return function(id) {\r\n    let count\r\n    if(target.matches('.good-minus')) {\r\n    goodsInChart.forEach(item => {\r\n      if(item.id === id){\r\n        item.quantityInChart = item.quantityInChart > 0 ? item.quantityInChart - 1 : 0\r\n        count =  item.quantityInChart\r\n      }\r\n    })\r\n  \r\n  } else if (target.matches('.good-plus')) {\r\n      goodsInChart.forEach(item => {\r\n      if(item.id === id){\r\n        item.quantityInChart = item.quantityInChart < 1000 ? item.quantityInChart + 1 : item.quantityInChart\r\n        count =  item.quantityInChart\r\n        }\r\n      })\r\n    }\r\n  return count\r\n  }\r\n \r\n}\r\n\r\nfunction getId (target){\r\n  return Number(target.dataset.id)\r\n}\r\n\r\n//產生購物籃物品\r\nfunction generateChartGoods (){\r\n  chartGoodsList.innerHTML = ''\r\n  goodsInChart.forEach(item => {\r\n  chartGoodsList.innerHTML += `<div class=\"form__chart__goods-list__item\">\r\n              <img src=\"${item.image}\"\r\n                alt=\"\"\r\n                class=\"form__chart__goods-list__item__image\">\r\n                    <div class=\"form__chart__goods-list__item__content\">\r\n                      <div class=\"flex-wrapper\">\r\n                        <div class=\"good-name\">\r\n                          ${item.name}\r\n                        </div>\r\n                        <div class=\"good-count\"><span class=\"good-minus\" data-id=\"${item.id}\">-</span> <span>${item.quantityInChart}</span> <span class=\"good-plus\" data-id=\"${item.id}\">+</span></div>\r\n                      </div>\r\n                      <div class=\"good-price\">$${item.total}</div>\r\n                    </div>\r\n                  </div>`\r\n})\r\n}\r\n\r\n//選擇運送方式\r\nfunction getCheckedValueForShipment(targetArr) {\r\n  let value = 'standard'\r\n  Array.from(targetArr).forEach((item) => {\r\n    value = item.checked ? item.value : value;\r\n    currentShipment.name = value\r\n    currentShipmentFee = shipments[currentShipment.name]\r\n  });\r\n}\r\n\r\nfunction onTrMethodsClicked(e) {\r\n  getCheckedValueForShipment(allTransportMethods)\r\n  showCurrentShipment()\r\n  showSum()\r\n}\r\n\r\nfunction showCurrentShipment () {\r\n  const shipFee = document.querySelector('#ship-fee')\r\n  shipFee.textContent = shipments[currentShipment.name] === 0 ? '免費' : `$${shipments[currentShipment.name]}`\r\n}\r\n///選擇運送方式\r\n\r\n\r\n\r\n\r\n\r\nfunction handleformBtnControlClicked(e) {\r\n  e.preventDefault();\r\n  const currentStep = steps[step];\r\n  if (e.target.matches(\".form__button-control__button--primary\")) {\r\n    const nextStep = steps[step + 1];\r\n    if (nextStep) {\r\n      currentStep.classList.remove(\"active\");\r\n      currentStep.classList.add(\"checked\");\r\n      nextStep.classList.add(\"active\");\r\n      formParts[step].classList.add(\"d-none\");\r\n      formParts[step + 1].classList.remove(\"d-none\");\r\n      step += 1;\r\n    }\r\n  } else if (e.target.matches(\".form__button-control__button--outline\")) {\r\n    const prevStep = steps[step - 1];\r\n\r\n    if (prevStep) {\r\n      currentStep.classList.remove(\"active\");\r\n      prevStep.classList.remove(\"checked\");\r\n      prevStep.classList.add(\"active\");\r\n      formParts[step].classList.add(\"d-none\");\r\n      formParts[step - 1].classList.remove(\"d-none\");\r\n      step -= 1;\r\n    }\r\n  }\r\n  setBtnDisabled();\r\n}\r\nfunction setBtnDisabled() {\r\n  if (step === 0) {\r\n    prevBtn.classList.add(\"d-none\");\r\n    formBtnControl.classList.add(\"display-one-btn\");\r\n  } else {\r\n    prevBtn.classList.remove(\"d-none\");\r\n    formBtnControl.classList.remove(\"display-one-btn\");\r\n  }\r\n  if (step === 2) {\r\n    //     在最後一步將按鈕改成確認下單並移除偽元素\r\n    nextBtn.innerHTML = \"確認下單\";\r\n    nextBtn.classList.add(\"last-step\");\r\n  } else {\r\n    nextBtn.innerHTML = \"下一步\";\r\n    nextBtn.classList.remove(\"last-step\");\r\n  }\r\n}\r\n\r\nformBtnControl.addEventListener(\"click\", handleformBtnControlClicked);\r\n\r\n\r\n\r\ngenerateChartGoods()\r\n\r\n//選擇運送方式\r\ntrMethods.addEventListener(\"click\", onTrMethodsClicked)\r\n\r\n//選擇購物籃數量\r\nchartGoodsList.addEventListener('click', onGoodCountClicked)\n\n//# sourceURL=webpack://webpack_test/./src/js/index.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/main.scss */ \"./src/scss/main.scss\");\n/* harmony import */ var _js_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/index */ \"./src/js/index.js\");\n/* harmony import */ var _js_index__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_index__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\nconsole.log('JS Loaded')\n\n//# sourceURL=webpack://webpack_test/./src/main.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;