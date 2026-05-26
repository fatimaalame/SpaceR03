// I create the SVG drawing area
const draw = SVG().addTo('#drawing').size(1000, 650);

// Main variables
let rocketStarted = false;
let hyperspace = false;

// Background
const background = draw.rect(1000, 650).fill('#050816');

// Title inside the SVG scene
const title = draw.text('Space Explorer')
  .move(30, 20)
  .font({ size: 30, family: 'Arial', weight: 'bold' })
  .fill('white');

// Status text
const statusText = draw.text('Status: ready for launch')
  .move(30, 60)
  .font({ size: 18, family: 'Arial' })
  .fill('#b8c7ff');


// Stars

const stars = [];

// I create many small stars with random positions
for (let i = 0; i < 45; i++) {
  const x = Math.random() * 950 + 20;
  const y = Math.random() * 560 + 30;
  const size = Math.random() * 3 + 2;

  const star = draw.circle(size)
    .center(x, y)
    .fill('white')
    .opacity(Math.random() * 0.6 + 0.4);

  stars.push(star);

  // Automatic animation: stars slowly blink
  star.animate({
    duration: 1200 + Math.random() * 1200,
    when: 'now',
    swing: true,
    times: true
  }).opacity(0.2);
}

// Planets !!!!!!!

// Planet 1
const planet1 = draw.group();
planet1.circle(90).center(160, 210).fill('#3b82f6');
planet1.circle(20).center(135, 190).fill('#60a5fa').opacity(0.8);
planet1.circle(14).center(180, 230).fill('#1d4ed8').opacity(0.8);

// Planet 2
const planet2 = draw.group();
planet2.circle(70).center(810, 160).fill('#f97316');
planet2.circle(18).center(790, 145).fill('#fdba74').opacity(0.8);
planet2.circle(12).center(830, 175).fill('#c2410c').opacity(0.8);

// Planet 3 with ring
const planet3 = draw.group();
planet3.ellipse(150, 35).center(740, 430).fill('none').stroke({ color: '#d8b4fe', width: 4 });
planet3.circle(80).center(740, 430).fill('#8b5cf6');
planet3.circle(18).center(720, 410).fill('#c4b5fd').opacity(0.8);

// Automatic animation: planets move a little
planet1.animate({ duration: 2500, swing: true, times: true }).dy(12);
planet2.animate({ duration: 3000, swing: true, times: true }).dy(-12);
planet3.animate({ duration: 3500, swing: true, times: true }).dy(10);

// Function used when a planet is clicked
function movePlanet(planet, name) {
  statusText.text('Status: ' + name + ' reacted to your signal');

  planet.animate(300).scale(1.15);
  planet.animate(400).dmove(25, -10);
  planet.animate(500).scale(1);
  planet.animate(400).dmove(-25, 10);
}

planet1.click(() => movePlanet(planet1, 'blue planet'));
planet2.click(() => movePlanet(planet2, 'orange planet'));
planet3.click(() => movePlanet(planet3, 'purple planet'));


// Rocket

const rocket = draw.group();

// Flame, hidden at start
const flame = rocket.polygon('0,0 25,70 50,0')
  .fill('#f97316')
  .move(475, 520)
  .opacity(0);

// Rocket body
rocket.ellipse(80, 160).center(500, 450).fill('#e5e7eb');
rocket.polygon('460,410 500,330 540,410').fill('#ef4444');
rocket.rect(50, 60).move(475, 430).fill('#d1d5db');

// Window
rocket.circle(35).center(500, 425).fill('#38bdf8').stroke({ color: '#0f172a', width: 4 });

// Wings
rocket.polygon('460,480 420,540 470,525').fill('#ef4444');
rocket.polygon('540,480 580,540 530,525').fill('#ef4444');

// Small details
rocket.line(475, 470, 525, 470).stroke({ color: '#6b7280', width: 3 });
rocket.line(475, 490, 525, 490).stroke({ color: '#6b7280', width: 3 });

// Interaction: click on rocket
rocket.click(() => {
  if (rocketStarted === false) {
    rocketStarted = true;
    statusText.text('Status: rocket launched');

    flame.opacity(1);

    rocket.animate(700).dy(-120);
    rocket.animate({ duration: 80, swing: true, times: 8 }).dx(5);
  } else {
    rocketStarted = false;
    statusText.text('Status: rocket back to launch position');

    flame.opacity(0);

    rocket.animate(700).dy(120);
  }
});

// Asteroid

const asteroid = draw.group();
asteroid.polygon('0,20 25,0 60,10 75,45 50,75 15,65')
  .fill('#78716c')
  .stroke({ color: '#44403c', width: 3 });
asteroid.circle(8).center(25, 25).fill('#57534e');
asteroid.circle(6).center(50, 45).fill('#57534e');
asteroid.move(300, 390);

// Automatic small movement
asteroid.animate({ duration: 2800, swing: true, times: true }).dmove(20, -15);

// Interaction: click on asteroid
asteroid.click(() => {
  statusText.text('Status: asteroid destroyed');

  asteroid.animate(400).scale(1.4).opacity(0);

  // Small explosion pieces
  for (let i = 0; i < 8; i++) {
    const piece = draw.circle(8)
      .center(335, 425)
      .fill('#facc15');

    piece.animate(700)
      .dmove((Math.random() - 0.5) * 160, (Math.random() - 0.5) * 160)
      .opacity(0)
      .after(() => piece.remove());
  }
});

// Satellite

const satellite = draw.group();

satellite.rect(45, 25).move(0, 20).fill('#94a3b8');
satellite.rect(35, 18).move(-38, 23).fill('#2563eb');
satellite.rect(35, 18).move(48, 23).fill('#2563eb');
satellite.line(45, 32, 80, 32).stroke({ color: '#cbd5e1', width: 3 });
satellite.line(0, 32, -35, 32).stroke({ color: '#cbd5e1', width: 3 });
satellite.move(120, 470);

// Satellite animation
satellite.animate({ duration: 4000, swing: true, times: true }).dmove(30, -20);

// Hyperspace button

const button = draw.group();

button.rect(170, 45)
  .move(790, 570)
  .radius(12)
  .fill('#1e293b')
  .stroke({ color: '#38bdf8', width: 2 });

button.text('Hyperspace')
  .move(815, 582)
  .font({ size: 20, family: 'Arial', weight: 'bold' })
  .fill('#e0f2fe');

button.click(() => {
  hyperspace = !hyperspace;

  if (hyperspace) {
    statusText.text('Status: hyperspace activated');
    background.fill('#020617');

    stars.forEach((star) => {
      star.animate(300).scale(3, 0.5).opacity(1);
    });
  } else {
    statusText.text('Status: normal space mode');
    background.fill('#050816');

    stars.forEach((star) => {
      star.animate(300).scale(1).opacity(0.7);
    });
  }
});


// Star click interaction

stars.forEach((star) => {
  star.click(() => {
    statusText.text('Status: all stars are scintillating');

    stars.forEach((s) => {
      s.animate(150).scale(2).opacity(1);
      s.animate(400).scale(1).opacity(0.5);
    });
  });
});