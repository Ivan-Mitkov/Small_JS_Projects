const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  MouseConstraint,
  Mouse,
} = Matter;
const width = 800;
const height = 550;
//The Matter.Engine module contains methods for creating and manipulating engines.
// An engine is a controller that manages updating the simulation of the world.
// See Matter.Runner for an optional game loop utility.
//1.create new engine
//Creates a new engine. The options parameter is an object that specifies
// any properties you wish to override the defaults.
const engine = Engine.create();
//A World composite object that will contain all simulated bodies and constraints.
//Default: a Matter.World instance
const { world } = engine;
//The Matter.Render module is a simple HTML5 canvas based renderer for
//visualising instances of Matter.Engine. It is intended for development
// and debugging purposes, but may also be suitable for simple games.
// It includes a number of drawing options including wireframe,
//vector with support for sprites and viewports.
const render = Render.create({
  //render representation of word inside document.body, add additional element
  element: document.body,
  //what engine to use
  engine: engine,

  options: {
    wireframes: false,
    //pixel values
    width,
    height,
  },
});

//render object to start working
Render.run(render);
//The Matter.Runner module is an optional utility which provides a game loop,
// that handles continuously updating a Matter.Engine for you within a browser.
// It is intended for development and debugging purposes,
// but may also be suitable for simple games.

//Continuously ticks a Matter.Engine by calling Runner.tick on the requestAnimationFrame event.
Runner.run(Runner.create(), engine);

//create shapes
const shape = Bodies.rectangle(400, 300, 50, 50, {
  // isStatic: true,
});

// add shapes to Word
// World.add(world, shape);

//Wals
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, {
    isStatic: true,
  }),
  Bodies.rectangle(0, height / 2, 40, height, {
    isStatic: true,
  }),
  Bodies.rectangle(width / 2, height, width, 40, {
    isStatic: true,
  }),
  Bodies.rectangle(width, height / 2, 40, height, {
    isStatic: true,
  }),
];

World.add(world, walls);
World.add(world, shape);
//Mouse for moving shapes
World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);

//Random shapes
for (let i = 0; i < 20; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50, {
        render: {
          fillStyle: `rgb(${Math.random() * 255},${Math.random() * 50},${
            Math.random() * 50
          })`,
        },
      })
    );
  } else {
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 30, {
        render: {
          fillStyle: `rgb(${Math.random() * 50},${Math.random() * 255},${
            Math.random() * 50
          })`,
        },
      })
    );
  }
}
