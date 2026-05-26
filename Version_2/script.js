// I create the SVG drawing area
const draw = SVG().addTo('#drawing').size(1000, 650);

// Main variables
let rocketStarted = false;
let voyage = false;

// Space background with a dark gradient
const spaceGradient = draw.gradient('linear', function(add) {
    add.stop(0, '#020617');
    add.stop(0.45, '#0f172a');
    add.stop(1, '#1e1b4b');
  });
  
const background = draw.rect(1000, 650).fill(spaceGradient);

// Soft colored nebulas in the background
const nebula1 = draw.circle(260)
  .center(180, 180)
  .fill('#7c3aed')
  .opacity(0.16);

const nebula2 = draw.circle(340)
  .center(850, 130)
  .fill('#0ea5e9')
  .opacity(0.12);

const nebula3 = draw.circle(280)
  .center(680, 520)
  .fill('#ec4899')
  .opacity(0.10);


// Title inside the SVG scene
const title = draw.text('Space explorer')
  .move(35, 40)
  .font({ size: 25, family: 'Arial', weight: 'bold' })
  .fill('white');

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
  planet.animate(300).scale(1.15);
  planet.animate(400).dmove(25, -10);
  planet.animate(500).scale(1);
  planet.animate(400).dmove(-25, 10);
}

planet1.click(() => movePlanet(planet1, 'blue planet'));
planet2.click(() => movePlanet(planet2, 'orange planet'));
planet3.click(() => movePlanet(planet3, 'purple planet'));

// Moon surface at the bottom
const moon = draw.group();

moon.ellipse(1100, 170)
  .center(500, 690)
  .fill('#64748b');

moon.ellipse(90, 22)
  .center(170, 610)
  .fill('#475569')
  .opacity(0.7);

moon.ellipse(120, 28)
  .center(390, 635)
  .fill('#475569')
  .opacity(0.65);

moon.ellipse(80, 20)
  .center(770, 615)
  .fill('#475569')
  .opacity(0.6);

moon.ellipse(55, 14)
  .center(880, 645)
  .fill('#475569')
  .opacity(0.5);

function showMoon() {
    moon.children()[0].fill('#64748b');
  
    moon.children()[1].fill('#475569').opacity(0.7);
    moon.children()[2].fill('#475569').opacity(0.65);
    moon.children()[3].fill('#475569').opacity(0.6);
    moon.children()[4].fill('#475569').opacity(0.5);
  }
  
function showEarth() {
    moon.children()[0].fill('#2563eb');
  
    moon.children()[1].fill('#22c55e').opacity(0.85);
    moon.children()[2].fill('#16a34a').opacity(0.8);
    moon.children()[3].fill('#22c55e').opacity(0.75);
    moon.children()[4].fill('#15803d').opacity(0.75);
  }
// Rocket

const rocket = draw.group();
rocket.translate(0, 80);

// Flame, hidden at start
const flame = rocket.group();

flame.polygon('0,0 25,85 50,0')
  .fill('#f97316')
  .move(475, 520);

flame.polygon('12,0 25,60 38,0')
  .fill('#facc15')
  .move(475, 525);

flame.opacity(0);

// Rocket body
rocket.ellipse(82, 165)
  .center(500, 450)
  .fill('#f8fafc')
  .stroke({ color: '#cbd5e1', width: 3 });

rocket.polygon('458,410 500,325 542,410')
  .fill('#ef4444')
  .stroke({ color: '#991b1b', width: 2 });

rocket.rect(50, 62)
  .move(475, 430)
  .fill('#e2e8f0')
  .stroke({ color: '#94a3b8', width: 2 });

// Window
rocket.circle(35).center(500, 425).fill('#38bdf8').stroke({ color: '#0f172a', width: 4 });

// Wings
rocket.polygon('460,480 415,545 470,525')
  .fill('#dc2626')
  .stroke({ color: '#7f1d1d', width: 2 });

rocket.polygon('540,480 585,545 530,525')
  .fill('#dc2626')
  .stroke({ color: '#7f1d1d', width: 2 });

// Small details
rocket.line(475, 470, 525, 470).stroke({ color: '#6b7280', width: 3 });
rocket.line(475, 490, 525, 490).stroke({ color: '#6b7280', width: 3 });

// Interaction: click on rocket
rocket.click(() => {
    // I avoid starting the animation again while the rocket is already moving
    if (rocketStarted === true) {
      return;
    }
  
    rocketStarted = true;
    flame.opacity(1);
  
    // I use a browser animation here because it is more reliable for a full loop
    rocket.node.style.transformBox = 'fill-box';
    rocket.node.style.transformOrigin = 'center';
  
    const rocketLoop = rocket.node.animate(
        [
          { transform: 'translate(0px, 0px) rotate(0deg)' },
          { transform: 'translate(0px, -90px) rotate(0deg)' },
          { transform: 'translate(120px, -125px) rotate(180deg)' },
          { transform: 'translate(-30px, -90px) rotate(360deg)' },
          { transform: 'translate(0px, 80px) rotate(360deg)' }
        ],
        {
          duration: 2800,
          easing: 'ease-in-out',
          fill: 'forwards'
        }
      );
  
    rocketLoop.onfinish = () => {
      // I reset the visual transform so the rocket is exactly back to its initial place
      rocket.node.style.transform = 'translate(0px, 0px) rotate(0deg)';
      flame.opacity(0);
      rocketStarted = false;
    };
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
// Interaction: click on satellite to send signal waves
satellite.click(() => {
    // I create 3 waves, like a wifi signal
    for (let i = 0; i < 3; i++) {
      const wave = draw.path('M 0 0 Q 25 -25 50 0')
        .fill('none')
        .stroke({
          color: '#38bdf8',
          width: 4,
          linecap: 'round'
        })
        .move(175, 465)
        .opacity(0);
  
      // Each wave starts a bit later
      wave.animate({
        duration: 700,
        delay: i * 180
      })
        .opacity(1)
        .scale(1 + i * 0.6)
        .dmove(20 + i * 15, -25 - i * 20)
        .after(() => {
          wave.animate(400).opacity(0).after(() => wave.remove());
        });
    }
  });

// Hyperspace button

const button = draw.group();

button.rect(170, 45)
  .move(790, 570)
  .radius(12)
  .fill('#1e293b')
  .stroke({ color: '#38bdf8', width: 2 });

const buttonText = button.text('Voyage')
  .move(840, 582)
  .font({ size: 20, family: 'Arial', weight: 'bold' })
  .fill('#e0f2fe');

button.click(() => {
  voyage = !voyage;

  if (voyage) {
    showEarth();
    buttonText.text('Lune');
    buttonText.move(850, 582);
  } else {
    showMoon();
    buttonText.text('Voyage');
    buttonText.move(840, 582);
  }
});


// Star click interaction

stars.forEach((star) => {
  star.click(() => {
    stars.forEach((s) => {
      s.animate(150).scale(2).opacity(1);
      s.animate(400).scale(1).opacity(0.5);
    });
  });
});

// Shooting star
const shootingStar = draw.line(0, 0, 80, -30)
  .move(80, 120)
  .stroke({ color: '#e0f2fe', width: 3, linecap: 'round' })
  .opacity(0.7);

shootingStar.animate({ duration: 3000, times: true })
  .move(900, 40)
  .opacity(0);