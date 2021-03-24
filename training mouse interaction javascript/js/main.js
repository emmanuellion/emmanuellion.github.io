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

ball.addEventListener('touchmove', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    ball.style.left = touch.pageX + 'px';
    ball.style.top = touch.pageY + 'px';
  }
}, false);