var height = document.getElementById('grid_div').offsetHeight / 10;
var width = document.getElementById('grid_div').offsetWidth / 10;
var grid = [];
for (var row = 0; row < height; row++){
  grid.push([]);
  for (var col = 0; col < width; col++)
    grid[row][col] = 0;
}

function initializeRandomGrid(){
  for (var row = 0; row < height; row++){
    for (var col = 0; col < width; col++){
      var rand = Math.random();
      if (rand < 0.9)
        grid[row][col] = 0;
      else
        grid[row][col] = 1;
    }
  }
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
  return changed;
}

function startSimulation(){
  var day = 1;
  var tick = setInterval(function(){
    if (evolveGrid())
      drawGrid();
    else
      clearInterval(tick);
    console.log(day++);
  },100);
}

initializeRandomGrid();
startSimulation();
