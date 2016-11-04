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
      if (rand < 0.5)
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

initializeRandomGrid();
drawGrid();
