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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _planetData = __webpack_require__(1);

var _planetData2 = _interopRequireDefault(_planetData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var center = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var scaleFactor = 1.1;
var AE = 149597870700;

// Event Listeners
addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Utility Functions
var randomFromRange = function randomFromRange(min, max) {
  return Math.random() * (max - min + 1) + min;
};

// Objects

var Luminary = function Luminary(radius, distance, velocity) {
  var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#9d9d9c';

  _classCallCheck(this, Luminary);

  this.x = center.x;
  this.y = center.y;
  this.radius = radius * 0.001;
  this.distance = distance * 100;
  this.velocity = velocity * 0.001;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
};

var Star = function () {
  function Star(label, radius, color) {
    _classCallCheck(this, Star);

    this.x = center.x;
    this.y = center.y;
    this.label = label;
    this.radius = radius;
    this.color = color;
  }

  _createClass(Star, [{
    key: 'draw',
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius * 0.01, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    }
  }]);

  return Star;
}();

var Planet = function (_Luminary) {
  _inherits(Planet, _Luminary);

  function Planet(label, radius, distance, velocity, color) {
    _classCallCheck(this, Planet);

    var _this = _possibleConstructorReturn(this, (Planet.__proto__ || Object.getPrototypeOf(Planet)).call(this, radius, distance, velocity, color));

    _this.label = label;
    return _this;
  }

  _createClass(Planet, [{
    key: 'draw',
    value: function draw() {
      // Orbit
      c.beginPath();
      c.arc(center.x, center.y, this.distance, 0, Math.PI * 2, false);
      c.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      c.stroke();
      c.closePath();

      // Planet
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    }
  }, {
    key: 'update',
    value: function update() {
      // Move planets over time
      this.radians += this.velocity;

      // Circular motion
      this.x = center.x + Math.cos(this.radians) * this.distance;
      this.y = center.y + Math.sin(this.radians) * this.distance;

      this.draw();
    }
  }]);

  return Planet;
}(Luminary);

var Asteroid = function (_Luminary2) {
  _inherits(Asteroid, _Luminary2);

  function Asteroid(radius, distance, velocity) {
    _classCallCheck(this, Asteroid);

    return _possibleConstructorReturn(this, (Asteroid.__proto__ || Object.getPrototypeOf(Asteroid)).call(this, radius, distance, velocity));
  }

  _createClass(Asteroid, [{
    key: 'draw',
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    }
  }, {
    key: 'update',
    value: function update() {
      // Move planets over time
      this.radians += this.velocity;

      // Circular motion
      this.x = center.x + Math.cos(this.radians) * this.distance;
      this.y = center.y + Math.sin(this.radians) * this.distance;

      this.draw();
    }
  }]);

  return Asteroid;
}(Luminary);

// Implementation


var sun = void 0;
var planets = void 0;
var asteroids = void 0;

var init = function init() {
  planets = [];
  asteroids = [];

  sun = new Star('Sun', 1000, '#ffe64a');

  _planetData2.default.forEach(function (data) {
    planets.push(new Planet(data.label, data.props.radius, data.props.distance, data.props.velocity, data.props.color));
  });

  for (var i = 0; i < 1000; i++) {
    var radius = randomFromRange(100, 800);
    var distance = randomFromRange(2, 3.4);
    var velocity = randomFromRange(0.2, 0.6);

    asteroids.push(new Asteroid(radius, distance, velocity));
  }
};

// const redraw = () => {
//   // Clear the entire canvas
//   c.save();
//   c.setTransform(1, 0, 0, 1, 0, 0);
//   c.clearRect(0, 0, canvas.width, canvas.height);
//   c.restore();
// };
//
// const zoom = (clicks) => {
//   const factor = Math.pow(scaleFactor, clicks);
//
//   c.translate(center.x, center.y);
//   c.scale(factor, factor);
//   c.translate(-center.x, -center.y);
//
//   redraw();
// };
//
// const handleScroll = (e) => {
//   const delta = e.wheelDelta ? e.wheelDelta / 40 : e.detail ? -e.detail : 0;
//   if (delta) zoom(delta);
//   return e.preventDefault() && false;
// };
//
// canvas.addEventListener('DOMMouseScroll', handleScroll, false);
// canvas.addEventListener('mousewheel', handleScroll, false);

// Animation Loop
var animate = function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);

  sun.draw();

  planets.forEach(function (planet) {
    planet.update();
  });

  asteroids.forEach(function (asteroid) {
    asteroid.update();
  });
};

init();
// redraw();
animate();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = [{"label":"Mercury","props":{"radius":2439.764,"distance":0.38709888,"velocity":47.8725,"color":"#8c8b79"}},{"label":"Venus","props":{"radius":6051.59,"distance":0.72333193,"velocity":35.0214,"color":"#b78b5f"}},{"label":"Earth","props":{"radius":6378.15,"distance":1,"velocity":29.7859,"color":"#6fbccf"}},{"label":"Mars","props":{"radius":3397,"distance":1.5236621,"velocity":24.1309,"color":"#b85139"}},{"label":"Jupiter","props":{"radius":71492.68,"distance":5.2033623,"velocity":13.0697,"color":"#8caaa7"}},{"label":"Saturn","props":{"radius":60267.14,"distance":9.537069,"velocity":9.6724,"color":"#d6cab1"}},{"label":"Uranus","props":{"radius":25559,"distance":19.191261,"velocity":6.8352,"color":"#7fada9"}},{"label":"Neptun","props":{"radius":24764,"distance":30.06896,"velocity":5.4778,"color":"#355f8f"}},{"label":"Pluto","props":{"radius":1187,"distance":39.482,"velocity":4.668,"color":"#b17f4a"}}]

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map