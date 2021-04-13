/*
  Main program
*/
const params = {};
params.play = false;

function actualise_height(){
  params.height = parseInt(document.querySelector('#range_H').value);
  canvas.height = params.height;
}

function actualise_width(){
  params.width = parseInt(document.querySelector('#range_W').value);
  canvas.width = params.width;
}

function actualise_size_cells(){
  params.cellSize = parseInt(document.querySelector('#range_C').value);
}

function actualise_speed(){
  params.timeOut = parseInt(document.querySelector('#range_T').value);
}

function play(){
  params.play = document.querySelector('#play').checked;
  console.log(params.play);
  if (params.play === false){
    updateCells();
  }
}


function go(){
  const canvas = document.getElementById("canvas");
  params.ctx = canvas.getContext("2d");
  params.ALIVE = document.querySelector('#input_color').value;
  params.VISITED = document.querySelector('#input_color_visited').value;
  params.DEAD = "#ffffff";
  taked = initCells(params);
  params.cells = taked.cells;
  params.wasVisited = taked.wasVisited;
  params.generation = 1;
  showGrid(params);
  window.requestAnimationFrame(updateCells);
}


function showGrid(params) {
  let y = params.cellSize;
  const color = "#d3d3d3";
  for (let i = 0; i < params.height / params.cellSize; i++) {
    params.ctx.beginPath();
    params.ctx.moveTo(0, y);
    params.ctx.lineTo(params.width, y);
    params.ctx.lineWidth = 1;
    params.ctx.strokeStyle = color;
    params.ctx.stroke();
    y += params.cellSize;
  }

  let x = params.cellSize;
  for (let j = 0; j < params.width / params.cellSize; j++) {
    params.ctx.beginPath();
    params.ctx.moveTo(x, 0);
    params.ctx.lineTo(x, params.height);
    params.ctx.lineWidth = 1;
    params.ctx.strokeStyle = color;
    params.ctx.stroke();
    x += params.cellSize;
  }
}

function updateCells() {
  if (params.play === false){
    document.querySelector('#count').innerHTML = params.generation;
    const newcells = [];

    for (let i = 0; i < params.width / params.cellSize; i++) {
      newcells[i] = [];
      for (let j = 0; j < params.height / params.cellSize; j++) {
        const nb_neighboors_alive = neighborhood(params, i, j);
        //--------------ERROR------------
        if (nb_neighboors_alive === 3) {
          newcells[i][j] = params.ALIVE;
        } else if (nb_neighboors_alive === 2) {
          newcells[i][j] = params.cells[i][j];
        } else if (nb_neighboors_alive < 2 || nb_neighboors_alive > 3){
          if (params.cells[i][j] === params.ALIVE){
            params.wasVisited[i][j] = 1;
          }
          if(params.wasVisited[i][j] === 1){
            newcells[i][j] = params.VISITED;
          }else{
            newcells[i][j] = params.DEAD;
          }
        }
      //--------------ERROR------------
      }
    }
    delete params.cells;
    params.cells = newcells;
    showCells(params);
    showGrid(params);
    params.timeOut = parseInt(document.querySelector('#range_T').value);
    params.generation++;
    setTimeout(() => {window.requestAnimationFrame(updateCells);}, params.timeOut);
  }else{
    animation = window.requestAnimationFrame(updateCells);
    window.cancelAnimationFrame(animation);
  }
}

function neighborhood(params, i, j) {
  let nb_neighboors_alive = 0;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      if (di == 0 && dj == 0) {
      } else {
        if (i + di >= 0 && i + di < params.width / params.cellSize) {
          if (j + dj >= 0 && j + dj < params.height / params.cellSize) {
            if (params.cells[i + di][j + dj] == params.ALIVE) {
              nb_neighboors_alive++;
            }
          }
        }
      }
    }
  }
  return nb_neighboors_alive;
}

function initCells(params) {
  const cells = [];
  const wasVisited = [];
  for (let i = 0; i < params.width / params.cellSize; i++) {
    cells[i] = [];
    wasVisited[i] = [];
    for (let j = 0; j < params.height / params.cellSize; j++) {
      if (Math.random() > 0.85) {
        cells[i][j] = params.ALIVE;
        wasVisited[i][j] = 1;
      } else {
        cells[i][j] = params.DEAD;
        wasVisited[i][j] = 0;
      }
    }
  }
  return {cells, wasVisited};
}

function showCells(params) {
  let x = 0;
  for (let i = 0; i < params.width / params.cellSize; i++) {
    let y = 0;
    for (let j = 0; j < params.height / params.cellSize; j++) {
      params.ctx.beginPath();
      params.ctx.rect(x, y, params.cellSize, params.cellSize);
      params.ctx.fillStyle = params.cells[i][j];
      params.ctx.fill();
      params.ctx.stroke();

      y += params.cellSize;
    }
    x += params.cellSize;
  }
}
