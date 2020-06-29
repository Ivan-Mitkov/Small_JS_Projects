const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;
const width = window.innerWidth;
const height = window.innerHeight;
// const cells = 10;
const cellsHorisontal = 15;
const cellsVertical = 10;
const totalCells = cellsHorisontal * cellsVertical;
// const unitLength = width / cells;
const unitLengthX = width / cellsHorisontal;
const unitLengthY = height / cellsVertical;
//shuffle
const shuffle = (arr) => {
  const res = [...arr];
  let counter = res.length;
  while (counter > 0) {
    const index = (Math.random() * counter) | 0;
    counter--;
    const temp = res[counter];
    res[counter] = res[index];
    res[index] = temp;
  }
  return res;
};
const engine = Engine.create();
//disable gravity
engine.world.gravity.y = 0;
const { world } = engine;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

//Wals
const walls = [
  Bodies.rectangle(width / 2, 0, width, 4, {
    isStatic: true,
  }),
  Bodies.rectangle(0, height / 2, 4, height, {
    isStatic: true,
  }),
  Bodies.rectangle(width / 2, height, width, 4, {
    isStatic: true,
  }),
  Bodies.rectangle(width, height / 2, 4, height, {
    isStatic: true,
  }),
];

World.add(world, walls);

//Maze generation
const grid = Array(cellsVertical)
  .fill(null)
  .map((arr) => Array(cellsHorisontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map((arr) => Array(cellsHorisontal - 1).fill(false));

const horisontals = Array(cellsVertical - 1)
  .fill(null)
  .map((arr) => Array(cellsHorisontal).fill(false));

console.log(grid);

//random start
const startRow = (Math.random() * cellsVertical) | 0;
const startColumn = (Math.random() * cellsHorisontal) | 0;
// console.log(startRow, startColumn);

const recurseStep = (raw, column) => {
  //if visited cell[raw,column] return
  if (grid[raw][column]) {
    return;
  }
  //mark cell as visited
  grid[raw][column] = true;
  //assemble list of neighbors
  const neighborsCoordinates = [
    [raw - 1, column, "up"],
    [raw, column + 1, "right"],
    [raw + 1, column, "down"],
    [raw, column - 1, "left"],
  ];
  //randomize neighbours
  const neighbours = shuffle(neighborsCoordinates);
  // console.log(neighbours)
  //for each neighbor
  for (let neighbour of neighbours) {
    const [nextRow, nextColumn, direction] = neighbour;
    //see if out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cellsVertical ||
      nextColumn < 0 ||
      nextColumn >= cellsHorisontal
    ) {
      continue;
    }
    //if this neghbor is visited continue to the next
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    //remove wall from either horisontal or vertical arr
    if (direction === "left") {
      verticals[raw][column - 1] = true;
    } else if (direction === "right") {
      verticals[raw][column] = true;
    } else if (direction === "up") {
      horisontals[raw - 1][column] = true;
    } else if (direction === "down") {
      horisontals[raw][column] = true;
    }
    // console.log(nextRow, nextColumn);
    recurseStep(nextRow, nextColumn);
  }
  //visit next cell

  //
};

recurseStep(startRow, startColumn);
// console.log(grid);
// console.log(verticals);
// console.log(horisontals);
horisontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    } else {
      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX / 2,
        rowIndex * unitLengthY + unitLengthY,
        unitLengthX,
        4,
        {
          isStatic: true,
          label: "horisontal wall",
          render: {
            fillStyle: "goldenrod",
          },
        }
      );
      World.add(world, wall);
    }
  });
});
// console.log(verticals);

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    } else {
      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX,
        rowIndex * unitLengthY + unitLengthY / 2,
        4,
        unitLengthY,
        {
          isStatic: true,
          label: "vertical wall",
          render: {
            fillStyle: "goldenrod",
          },
        }
      );
      World.add(world, wall);
    }
  });
});

const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * 0.7,
  unitLengthY * 0.7,
  {
    isStatic: true,
    label: "goal",
    render: {
      fillStyle: "lawngreen",
    },
  }
);
const radius = (unitLengthX < unitLengthY ? unitLengthX : unitLengthY) * 0.3;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, radius, {
  isStatic: false,
  label: "ball",
  render: {
    fillStyle: "lawngreen",
  },
});
World.add(world, goal);
World.add(world, ball);

//Handling keypress
//arrow up 38
//arrow down 40
//left arrow 37
//right arrow 39
document.addEventListener("keydown", (e) => {
  // console.log(e.keyCode);
  //get current velocity of the ball
  const { x, y } = ball.velocity;
  if (e.keyCode === 38) {
    // console.log("Move ball up");
    Body.setVelocity(ball, { x: x, y: y - 3 });
  } else if (e.keyCode === 40) {
    // console.log("Move ball down");
    Body.setVelocity(ball, { x: x, y: y + 3 });
  } else if (e.keyCode === 37) {
    // console.log("Move ball left");
    Body.setVelocity(ball, { x: x - 3, y: y });
  } else if (e.keyCode === 39) {
    // console.log("Move ball right");
    Body.setVelocity(ball, { x: x + 3, y: y });
  }
});

//Win condition
Events.on(engine, "collisionStart", (e) => {
  // console.log(e); when console log the event.pairs arr is already wiped out
  e.pairs.forEach((collision) => {
    const labels = ["ball", "goal"];
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      console.log("User Won!");
      world.gravity.y = 1;
      world.bodies.forEach((b) => {
        if (b.label === "horisontal wall") {
          Body.setStatic(b, false);
        }
        setTimeout(() => {
          if (b.label === "vertical wall") {
            Body.setStatic(b, false);
            setTimeout(() => {
              document.querySelector(".winner").classList.remove("hidden");
            }, 500);
          }
        }, 500);
      });
    }
  });
});
