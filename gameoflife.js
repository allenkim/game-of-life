var height = document.getElementById('grid_div').offsetHeight / 10;
var width = document.getElementById('grid_div').offsetWidth / 10;
var tick; // for setInterval
var running = false; // boolean to check if the simulation is running or not
var grid = [];
for (var row = 0; row < height; row++){
  grid.push([]);
  for (var col = 0; col < width; col++)
    grid[row][col] = 0;
}

function drawGrid(){
  for (var row = 0; row < height; row++){
    for (var col = 0; col < width; col++){
      var cell = document.getElementById(row+'-'+col);
      if (grid[row][col])
        cell.setAttribute('fill-opacity',1);
      else
        cell.setAttribute('fill-opacity',0);
    }
  }
}

function initializeRandomGrid(){
  for (var row = 0; row < height; row++){
    for (var col = 0; col < width; col++){
      var rand = Math.random();
      if (rand < 0.6)
        grid[row][col] = 0;
      else
        grid[row][col] = 1;
    }
  }
  drawGrid();
}

function numNeighbors(row,col){
  var count = 0;
  var dr = [-1,-1,-1,0,0,1,1,1];
  var dc = [-1,0,1,-1,1,-1,0,1];
  for (var i = 0; i < 8; i++){
    if (grid[row+dr[i]])
      if (grid[row+dr[i]][col+dc[i]])
        count++;
  }
  return count;
}

function evolveGrid(){
  var next = [];
  for (var row = 0; row < height; row++){
    next.push(grid[row].slice());
  }
  var changed = false;
  for (var row = 0; row < height; row++){
    for (var col = 0; col < width; col++){
      var alive = (grid[row][col] == 1);
      var cellNeighbors = numNeighbors(row,col);
      if (alive && (cellNeighbors < 2 || cellNeighbors > 3)){
        next[row][col] = 0;
        changed = true;
      }
      else if (!alive && cellNeighbors == 3){
        next[row][col] = 1;
        changed = true;
      }
    }
  }
  grid = next;
  drawGrid();
  return changed;
}

function startSimulation(){
  if (running)
    return;
  var day = 1;
  running = true;
  tick = setInterval(function(){
    if (!evolveGrid()){
      clearInterval(tick);
      running = false;
    }
  },80);
}

function stopSimulation(){
  clearInterval(tick);
  running = false;
}

function resetGrid(){
  for (var row = 0; row < height; row++){
    for (var col = 0; col < width; col++){
      grid[row][col] = 0;
    }
  }
  drawGrid();
}

function createGliderGun(){
  resetGrid();
  grid[15][12] = 1;
  grid[14][12] = 1;
  grid[14][13] = 1;
  grid[15][13] = 1;
  grid[14][22] = 1;
  grid[15][22] = 1;
  grid[16][22] = 1;
  grid[13][23] = 1;
  grid[12][24] = 1;
  grid[17][23] = 1;
  grid[18][24] = 1;
  grid[12][25] = 1;
  grid[18][25] = 1;
  grid[15][26] = 1;
  grid[13][27] = 1;
  grid[17][27] = 1;
  grid[14][28] = 1;
  grid[15][28] = 1;
  grid[16][28] = 1;
  grid[15][29] = 1;
  grid[14][32] = 1;
  grid[13][32] = 1;
  grid[12][32] = 1;
  grid[12][33] = 1;
  grid[13][33] = 1;
  grid[14][33] = 1;
  grid[11][34] = 1;
  grid[15][34] = 1;
  grid[11][36] = 1;
  grid[10][36] = 1;
  grid[15][36] = 1;
  grid[16][36] = 1;
  grid[12][46] = 1;
  grid[13][46] = 1;
  grid[13][47] = 1;
  grid[12][47] = 1;
  drawGrid();
}
