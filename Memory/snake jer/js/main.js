//zorgt ervoor dat arrow keys werken
window.addEventListener("keydown", function (event) {
  console.log(event.key);
  if (event.key === "ArrowUp") Snake.moveUp();
  else if (event.key === "ArrowDown") Snake.moveDown();
  else if (event.key === "ArrowLeft") Snake.moveLeft();
  else if (event.key === "ArrowRight") Snake.moveRight();
});

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = GAME.width;
  canvas.height = GAME.height;
  ctx.font = '30px Impact';
  ctx.textBaseline = 'top';

  canvas.addEventListener('click', () => {
    if (GAME.gameOver){
      resetGame();
      GAME.loop = setInterval(animate, 230);
    }
 });

 resetGame();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Snake.draw(ctx);
    Food.draw(ctx);
    Snake.update();

    if (GAME.gameOver) {
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.font = "40px Impact";
      ctx.fillText("GAME OVER!", GAME.width * 0.5, GAME.height * 0.4, GAME.width * 0.95);
      clearInterval(GAME.loop);
      ctx.font = "10pxpx Impact";
      ctx.fillText("click here to restart!", GAME.width * 0.5, GAME.height * 0.4 + 60, GAME.width * 0.95);
      clearInterval(GAME.loop)
    }
  }

  GAME.loop = setInterval(animate, 230);
});
