import planetData from './planet-data.json';

// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const center = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const scaleFactor = 1.1;
const AE = 149597870700;


// Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Utility Functions
const randomFromRange = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

// Objects
class Luminary {

  constructor(radius, distance, velocity, color = '#9d9d9c') {
    this.x = center.x;
    this.y = center.y;
    this.radius = radius * 0.001;
    this.distance = distance * 100;
    this.velocity = velocity * 0.001;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
  }

}

class Star {

  constructor(label, radius, color) {
    this.x = center.x;
    this.y = center.y;
    this.label = label;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius * 0.01, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

}

class Planet extends Luminary {

  constructor(label, radius, distance, velocity, color) {
    super(radius, distance, velocity, color);

    this.label = label;
  }

  draw() {
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

  update() {
    // Move planets over time
    this.radians += this.velocity;

    // Circular motion
    this.x = center.x + Math.cos(this.radians) * this.distance;
    this.y = center.y + Math.sin(this.radians) * this.distance;

    this.draw();
  }

}

class Asteroid extends Luminary {

  constructor(radius, distance, velocity) {
    super(radius, distance, velocity);
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    // Move planets over time
    this.radians += this.velocity;

    // Circular motion
    this.x = center.x + Math.cos(this.radians) * this.distance;
    this.y = center.y + Math.sin(this.radians) * this.distance;

    this.draw();
  }

}

// Implementation
let sun;
let planets;
let asteroids;

const init = () => {
  planets = [];
  asteroids = [];

  sun = new Star('Sun', 1000, '#ffe64a');

  planetData.forEach((data) => {
    planets.push(new Planet(data.label, data.props.radius, data.props.distance, data.props.velocity, data.props.color));
  });

  for (let i = 0; i < 1000; i++) {
    const radius = randomFromRange(100, 800);
    const distance = randomFromRange(2, 3.4);
    const velocity = randomFromRange(0.2, 0.6);

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
const animate = () => {
  requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);

  sun.draw();

  planets.forEach((planet) => {
    planet.update();
  });

  asteroids.forEach((asteroid) => {
    asteroid.update();
  });
};

init();
// redraw();
animate();
