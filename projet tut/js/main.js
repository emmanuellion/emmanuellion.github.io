ball = div;
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