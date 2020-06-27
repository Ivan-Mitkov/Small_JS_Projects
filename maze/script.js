const { Engine, Render, Runner, World, Bodies } = Matter;
const width = 600;
const height = 600;
const cells = 3;

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

const { world } = engine;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true,
    width,
    height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

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

//Maze generation
const grid = Array(cells)
  .fill(null)
  .map((arr) => Array(cells).fill(false));

const verticals = Array(cells)
  .fill(null)
  .map((arr) => Array(cells - 1).fill(false));

const horisontals = Array(cells - 1)
  .fill(null)
  .map((arr) => Array(cells).fill(false));

// console.log(grid);

//random start
const startRow = (Math.random() * cells) | 0;
const startColumn = (Math.random() * cells) | 0;

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
  //for each neighbor
  for (let neighbour of neighbours) {
    const [nextRow, nextColumn, direction] = neighbour;
    //see if out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    ) {
      continue;
    }
    //if this neghbor is visited continue to the next
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    //remove wall from either horisontal or vertical arr
  }
  //visit next cell

  //
};

recurseStep(startRow, startColumn);
console.log(grid);
