body = document.getElementsByTagName("body")[0];
p = document.getElementsByTagName("p")[0];
canvas = document.getElementsByTagName("canvas")[0];


canvas.addEventListener('mousemove', logKey);

function logKey(e) {
  p.innerHTML = e.clientX + " " + e.clientY;
}

ball = canvas;
ball.onmousedown = function(event) {

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

function handleEnd(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  ctx.lineWidth = 4;

  for (var i=0; i<touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(ongoingTouches[i].pageX, ongoingTouches[i].pageY);
    ctx.lineTo(touches[i].pageX, touches[i].pageY);
    ongoingTouches.splice(i, 1);  // On enlève le point
  }
}