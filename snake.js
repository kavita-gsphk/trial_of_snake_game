if (window.innerHeight > 510 && window.innerWidth > 510) {
  const cvs = document.getElementById("snake");
  const ctx = cvs.getContext("2d");
  const fruit = cvs.getContext("2d");
  const box = 30;
  cvs.width = 510;
  cvs.height = 510;
  console.log(window.innerWidth);
  cvs.style.left = (window.innerWidth - cvs.width) / 2 + "px";
  cvs.style.top = (window.innerHeight - cvs.height) / 2 + "px";
  let speed = "Speed";
  let rate = 1.5;
  let game_1;
  let game_2;
  let game_3;
  let game_4;
  let game_5;
  let game_6;
  let game_7;
  const ground = new Image();
  ground.src = "img/back_4.jpg";
  const plus = new Image();
  plus.src = "img/plus_3.png";
  const nag = new Image();
  nag.src = "img/negative_3.png";
  const box_1 = 20;
  let snake = [];
  snake[0] = {
    x: 9 * box,
    y: 10 * box,
  };
  let food = {
    x: Math.floor(Math.random() * 17) * box,
    y: Math.floor(Math.random() * 15 + 2) * box,
  };
  const text = "Score";
  let score = 0;
  let d;
  let p_s_x;
  let p_m_x;
  let p_s_y;
  let p_m_y;
  ctx.canvas.addEventListener("click", decrese);
  document.addEventListener("keydown", direction);
  document.addEventListener("touchstart", s);
  document.addEventListener("touchmove", m);
  document.addEventListener("touchend", e);
  document.addEventListener("touchcancel", c);
  function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "right") {
      d = "left";
    } else if (key == 38 && d != "down") {
      d = "up";
    } else if (key == 39 && d != "left") {
      d = "right";
    } else if (key == 40 && d != "up") {
      d = "down";
    }
  }

  function s(event) {
    p_s_x = event.targetTouches[0].clientX;
    p_s_y = event.targetTouches[0].clientY;
  }
  function m(event) {
    p_m_x = event.targetTouches[0].clientX;
    p_m_y = event.targetTouches[0].clientY;
  }
  function c(event) {
    p_m_x = event.targetTouches[0].clientX;
    p_m_y = event.targetTouches[0].clientY;
  }
  function e(event) {
    if (p_m_x - p_s_x > 30 && d != "left") {
      if (p_m_y - p_s_y < 30 || p_s_y - p_m_y < 100) {
        d = "right";
      }
    }
    if (p_s_x - p_m_x > 30 && d != "right") {
      if (p_m_y - p_s_y < 30 || p_s_y - p_m_y < 30) {
        d = "left";
      }
    }
    if (p_m_y - p_s_y > 30 && d != "up") {
      if (p_m_x - p_s_x < 30 || p_s_x - p_m_x < 30) {
        d = "down";
      }
    }
    if (p_s_y - p_m_y > 30 && d != "down") {
      if (p_m_x - p_s_x < 30 || p_s_x - p_m_x < 30) {
        d = "up";
      }
    }
  }
  function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
      if (head.x == array[i].x && head.y == array[i].y) {
        return true;
      }
    }
    return false;
  }

  function draw() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(nag, 11 * box, 0.5 * box);
    ctx.drawImage(plus, 15.4 * box, 0.5 * box);
    for (let i = 0; i < snake.length; i++) {
      if (i == 0) {
        ctx.fillStyle = "	#006400";
      } else {
        ctx.fillStyle = "gray";
      }
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
      ctx.strokeStyle = "red";
      ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    fruit.fillStyle = "#720000";
    if (food.x == 5 * box && food.y > 11 * box) {
      food = {
        x: Math.floor(Math.random() * 17) * box,
        y: Math.floor(Math.random() * 15 + 2) * box,
      };
    }
    if (food.x > 6 * box && food.y == 8 * box) {
      food = {
        x: Math.floor(Math.random() * 17) * box,
        y: Math.floor(Math.random() * 15 + 2) * box,
      };
    }
    if (food.x < 3 * box && food.y == 5 * box) {
      food = {
        x: Math.floor(Math.random() * 17) * box,
        y: Math.floor(Math.random() * 15 + 2) * box,
      };
    }
    fruit.fillRect(food.x, food.y, box, box);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (d == "left") {
      snakeX -= box;
    }
    if (d == "up") {
      snakeY -= box;
    }
    if (d == "right") {
      snakeX += box;
    }
    if (d == "down") {
      snakeY += box;
    }
    if (snakeX == food.x && snakeY == food.y) {
      score++;
      food = {
        x: Math.floor(Math.random() * 16) * box,
        y: Math.floor(Math.random() * 14 + 2) * box,
      };
    } else {
      snake.pop();
    }
    let newHead = {
      x: snakeX,
      y: snakeY,
    };
    if (
      snakeX < 0 * box ||
      snakeX > 16 * box ||
      snakeY < 2 * box ||
      snakeY > 16 * box ||
      collision(newHead, snake)
    ) {
      clearInterval(game);
      clearInterval(game_1);
      clearInterval(game_2);
      clearInterval(game_3);
      clearInterval(game_4);
      clearInterval(game_5);
      clearInterval(game_6);
      clearInterval(game_7);
    }
    if (snakeX == 5 * box && snakeY > 11 * box) {
      clearInterval(game);
      clearInterval(game_1);
      clearInterval(game_2);
      clearInterval(game_3);
      clearInterval(game_4);
      clearInterval(game_5);
      clearInterval(game_6);
      clearInterval(game_7);
    }
    if (snakeX > 6 * box && snakeY == 8 * box) {
      clearInterval(game);
      clearInterval(game_1);
      clearInterval(game_2);
      clearInterval(game_3);
      clearInterval(game_4);
      clearInterval(game_5);
      clearInterval(game_6);
      clearInterval(game_7);
    }
    if (snakeX < 3 * box && snakeY == 5 * box) {
      clearInterval(game);
      clearInterval(game_1);
      clearInterval(game_2);
      clearInterval(game_3);
      clearInterval(game_4);
      clearInterval(game_5);
      clearInterval(game_6);
      clearInterval(game_7);
    }
    snake.unshift(newHead);
    ctx.fillStyle = "black";
    ctx.font = "40px Changa one";
    ctx.strokeText(text, box, 1.5 * box);
    ctx.fillText(text, box, 1.5 * box);
    ctx.strokeText(score, 5 * box, 1.5 * box);
    ctx.fillText(score, 5 * box, 1.5 * box);
    ctx.strokeText(speed, 7 * box, 1.5 * box);
    ctx.fillText(speed, 7 * box, 1.5 * box);
    ctx.strokeText(rate, 13 * box, 1.5 * box);
    ctx.fillText(rate, 13 * box, 1.5 * box);
  }
  ctx.canvas.addEventListener("click", decrese);
  function decrese() {
    console.log(rate);
    if (
      event.clientX - ctx.canvas.offsetLeft > 11 * box &&
      event.clientX - ctx.canvas.offsetLeft < 12 * box &&
      event.clientY - ctx.canvas.offsetTop > 0.5 * box &&
      event.clientY - ctx.canvas.offsetTop < 1.5 * box
    ) {
      if (rate > 0.5) {
        rate = rate - 0.5;
      } else {
        return;
      }
    } else if (
      event.clientX - ctx.canvas.offsetLeft > 15.4 * box &&
      event.clientX - ctx.canvas.offsetLeft < 16.4 * box &&
      event.clientY - ctx.canvas.offsetTop > 0.5 * box &&
      event.clientY - ctx.canvas.offsetTop < 1.5 * box
    ) {
      if (rate < 3) {
        rate = rate + 0.5;
      } else {
        return;
      }
    } else {
      return;
    }
    if (rate == 0.5) {
      clearInterval(game);
      game_1 = setInterval(draw, 800);
    }
    if (rate == 1) {
      clearInterval(game);
      game_2 = setInterval(draw, 700);
    }
    if (rate == 1.5) {
      clearInterval(game);
      game_3 = setInterval(draw, 200);
    }
    if (rate == 2) {
      clearInterval(game);
      game_4 = setInterval(draw, 150);
    }
    if (rate == 2.5) {
      clearInterval(game);
      game_5 = setInterval(draw, 100);
    }
    if (rate == 3) {
      clearInterval(game);
      game_6 = setInterval(draw, 80);
    }
  }
  let game = setInterval(draw, 200);
}

//for mobile
//
//
//
//
//
//
//
else {
  const cvs = document.getElementById("snake");
  const ctx = cvs.getContext("2d");
  const fruit = cvs.getContext("2d");
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
  const max_width = window.innerWidth;
  const max_hight = 100 + "%";
  const box_w = Math.floor(window.innerWidth / 20);
  const box_h = Math.floor(window.innerHeight / 30);
  let speed = "Speed";
  let rate = 1.5;
  let game_1;
  let game_2;
  let game_3;
  let game_4;
  let game_5;
  let game_6;
  let game_7;
  const ground = new Image();
  if (window.innerWidth < window.innerHeight) {
    ground.src = "img/b5.jpg";
  }
  if (window.innerWidth > window.innerHeight) {
    ground.src = "img/b5.jpg";
  }
  const plus = new Image();
  plus.src = "img/plus_1.png";
  const nag = new Image();
  nag.src = "img/negative_1.png";
  let snake = [];
  snake[0] = {
    x: 10 * box_w,
    y: 17 * box_h,
  };
  let food = {
    x: Math.floor(Math.random() * 20) * box_w,
    y: Math.floor(Math.random() * 28 + 2) * box_h,
  };
  const text = "Score";
  let score = 0;
  let d;
  let p_s_x;
  let p_m_x;
  let p_s_y;
  let p_m_y;
  ctx.canvas.addEventListener("click", decrese);
  document.addEventListener("keydown", direction);
  document.addEventListener("touchstart", s);
  document.addEventListener("touchmove", m);
  document.addEventListener("touchend", e);
  //document.addEventListener("touchcancel", c);
  function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "right") {
      d = "left";
    } else if (key == 38 && d != "down") {
      d = "up";
    } else if (key == 39 && d != "left") {
      d = "right";
    } else if (key == 40 && d != "up") {
      d = "down";
    }
  }

  function s(event) {
    //console.log(event.touches);
    p_s_x = event.targetTouches[0].clientX;
    p_s_y = event.targetTouches[0].clientY;
  }
  function m(event) {
    p_m_x = event.targetTouches[0].clientX;
    p_m_y = event.targetTouches[0].clientY;
  }
  /*function c(event) {
    p_m_x = event.targetTouches[0].clientX;
    p_m_y = event.targetTouches[0].clientY;
  }*/
  //console.log(touches[0].clientX);
  function e(event) {
    if (p_m_x - p_s_x >= 100 && d != "left") {
      if (p_m_y - p_s_y < 100 || p_s_y - p_m_y < 100) {
        d = "right";
      }
    }
    if (p_s_x - p_m_x >= 100 && d != "right") {
      if (p_m_y - p_s_y < 100 || p_s_y - p_m_y < 100) {
        d = "left";
      }
    }
    if (p_m_y - p_s_y >= 100 && d != "up") {
      if (p_m_x - p_s_x < 100 || p_s_x - p_m_x < 100) {
        d = "down";
      }
    }
    if (p_s_y - p_m_y >= 100 && d != "down") {
      if (p_m_x - p_s_x < 100 || p_s_x - p_m_x < 100) {
        d = "up";
      }
    }
  }
  function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
      if (head.x == array[i].x && head.y == array[i].y) {
        return true;
      }
    }
    return false;
  }
  function draw() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(nag, 13 * box_w, 0.75 * box_h);
    ctx.drawImage(plus, 18 * box_w, 0.75 * box_h);
    //console.log(snake.length);
    for (let i = 0; i < snake.length; i++) {
      if (i == 0) {
        ctx.fillStyle = "	#006400";
      } else {
        ctx.fillStyle = "gray";
      }
      ctx.fillRect(snake[i].x, snake[i].y, box_w, box_h);
      ctx.strokeStyle = "red";
      ctx.strokeRect(snake[i].x, snake[i].y, box_w, box_h);
    }
    fruit.fillStyle = "#720000";
    fruit.fillRect(food.x, food.y, box_w, box_h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(food.x, food.y, box_w, box_h);
    ctx.strokeStyle = "red";
    ctx.fillRect(0, 2 * box_h, max_width, 3);
    ctx.fillRect(0, 0, 3, max_hight);
    ctx.fillRect(0, 0, max_width, 3);
    ctx.fillRect(0, max_hight - 3, max_width, 3);
    ctx.fillRect(max_width - 3, 0, 3, max_hight);
    ctx.fillRect(8 * box_w, 22 * box_h, 5 * box_w, box_h);
    ctx.fillRect(8 * box_w, 8 * box_h, 8 * box_w, box_h);
    ctx.fillRect(8 * box_w, 8 * box_h, box_w, 10 * box_h);
    ctx.fillRect(8 * box_w, 18 * box_h, 8 * box_w, box_h);
    ctx.fillRect(13 * box_w, 13 * box_h, 8 * box_w, box_h);
    ctx.fillRect(0 * box_w, 26 * box_h, 7 * box_w, box_h);
    if (food.x < 7 * box_w && food.y == 26 * box_h) {
      food = {
        x: Math.floor(Math.random() * 17) * box_w,
        y: Math.floor(Math.random() * 15 + 2) * box_h,
      };
    }
    if (food.x > 7 * box_w && food.x < 16 * box_w && food.y == 18 * box_h) {
      food = {
        x: Math.floor(Math.random() * 17) * box_w,
        y: Math.floor(Math.random() * 15 + 2) * box_h,
      };
    }
    if (food.x > 7 * box_w && food.x < 13 * box_w && food.y == 22 * box_h) {
      food = {
        x: Math.floor(Math.random() * 17) * box_w,
        y: Math.floor(Math.random() * 15 + 2) * box_h,
      };
    }
    if (food.x > 7 * box_w && food.x < 16 * box_w && food.y == 8 * box_h) {
      food = {
        x: Math.floor(Math.random() * 17) * box_w,
        y: Math.floor(Math.random() * 15 + 2) * box_h,
      };
    }
    if (food.x == 8 * box_w && food.y > 7 * box_h && food.y < 18 * box_h) {
      food = {
        x: Math.floor(Math.random() * 17) * box_w,
        y: Math.floor(Math.random() * 15 + 2) * box_h,
      };
    }
    if (food.x > 12 * box_w && food.x < 20 * box_w && food.y == 13 * box_h) {
      food = {
        x: Math.floor(Math.random() * 17) * box_w,
        y: Math.floor(Math.random() * 15 + 2) * box_h,
      };
    }
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (d == "left") {
      snakeX -= box_w;
    }
    if (d == "up") {
      snakeY -= box_h;
    }
    if (d == "right") {
      snakeX += box_w;
    }
    if (d == "down") {
      snakeY += box_h;
    }
    if (snakeX == food.x && snakeY == food.y) {
      score++;
      food = {
        x: Math.floor(Math.random() * 20) * box_w,
        y: Math.floor(Math.random() * 28 + 2) * box_h,
      };
    } else {
      snake.pop();
    }
    let newHead = {
      x: snakeX,
      y: snakeY,
    };

    if (
      snakeX < 0 ||
      snakeX > window.innerWidth - 3 ||
      snakeY < 2 * box_h ||
      snakeY > window.innerHeight - 3 ||
      collision(newHead, snake)
    ) {
      clearInterval(game);
      clearInterval(game_1);
      clearInterval(game_2);
      clearInterval(game_3);
      clearInterval(game_4);
      clearInterval(game_5);
      clearInterval(game_6);
      clearInterval(game_7);
    }
    if (snakeX < 7 * box_w && snakeY == 26 * box_h) {
      clearInterval(game);
      clearInterval(game_1);
      clearInterval(game_2);
      clearInterval(game_3);
      clearInterval(game_4);
      clearInterval(game_5);
      clearInterval(game_6);
      clearInterval(game_7);
    }
    if (snakeX > 7 * box_w && snakeX < 16 * box_w && snakeY == 18 * box_h) {
      clearInterval(game);
      clearInterval(game_1);
      clearInterval(game_2);
      clearInterval(game_3);
      clearInterval(game_4);
      clearInterval(game_5);
      clearInterval(game_6);
      clearInterval(game_7);
    }
    if (snakeX > 7 * box_w && snakeX < 13 * box_w && snakeY == 22 * box_h) {
      clearInterval(game);
      clearInterval(game_1);
      clearInterval(game_2);
      clearInterval(game_3);
      clearInterval(game_4);
      clearInterval(game_5);
      clearInterval(game_6);
      clearInterval(game_7);
    }
    if (snakeX > 7 * box_w && snakeX < 16 * box_w && snakeY == 8 * box_h) {
      clearInterval(game);
      clearInterval(game_1);
      clearInterval(game_2);
      clearInterval(game_3);
      clearInterval(game_4);
      clearInterval(game_5);
      clearInterval(game_6);
      clearInterval(game_7);
    }
    if (snakeX == 8 * box_w && snakeY > 7 * box_h && snakeY < 18 * box_h) {
      clearInterval(game);
      clearInterval(game_1);
      clearInterval(game_2);
      clearInterval(game_3);
      clearInterval(game_4);
      clearInterval(game_5);
      clearInterval(game_6);
      clearInterval(game_7);
    }
    if (snakeX > 12 * box_w && snakeX < 20 * box_w && snakeY == 13 * box_h) {
      clearInterval(game);
      clearInterval(game_1);
      clearInterval(game_2);
      clearInterval(game_3);
      clearInterval(game_4);
      clearInterval(game_5);
      clearInterval(game_6);
      clearInterval(game_7);
    }
    ctx.fillRect(7 * box_w, 0, 3, 2 * box_h);
    snake.unshift(newHead);
    ctx.fillStyle = "black";
    ctx.font = "20px Changa one";
    ctx.strokeText(text, box_w, 1.5 * box_h);
    ctx.fillText(text, box_w, 1.5 * box_h);
    ctx.strokeText(score, 5.5 * box_w, 1.5 * box_h);
    ctx.fillText(score, 5.5 * box_w, 1.5 * box_h);
    ctx.strokeText(speed, 8 * box_w, 1.5 * box_h);
    ctx.fillText(speed, 8 * box_w, 1.5 * box_h);
    ctx.strokeText(rate, 15 * box_w, 1.5 * box_h);
    ctx.fillText(rate, 15 * box_w, 1.5 * box_h);
  }
  ctx.canvas.addEventListener("click", decrese);
  function decrese() {
    if (
      event.clientX - ctx.canvas.offsetLeft > 12 * box_w &&
      event.clientX - ctx.canvas.offsetLeft < 14 * box_w &&
      event.clientY - ctx.canvas.offsetTop > 0 * box_h &&
      event.clientY - ctx.canvas.offsetTop < 2 * box_w
    ) {
      if (rate > 0.5) {
        rate = rate - 0.5;
      } else {
        return;
      }
    }
    if (
      event.clientX - ctx.canvas.offsetLeft > 17 * box_w &&
      event.clientX - ctx.canvas.offsetLeft < 19 * box_w &&
      event.clientY - ctx.canvas.offsetTop > 0 * box_h &&
      event.clientY - ctx.canvas.offsetTop < 2 * box_w
    ) {
      if (rate < 3) {
        rate = rate + 0.5;
      } else {
        return;
      }
    } else {
      return;
    }
    if (rate == 0.5) {
      clearInterval(game);
      game_1 = setInterval(draw, 800);
    }
    if (rate == 1) {
      clearInterval(game);
      game_2 = setInterval(draw, 700);
    }
    if (rate == 1.5) {
      clearInterval(game);
      game_3 = setInterval(draw, 200);
    }
    if (rate == 2) {
      clearInterval(game);
      game_4 = setInterval(draw, 150);
    }
    if (rate == 2.5) {
      clearInterval(game);
      game_5 = setInterval(draw, 100);
    }
    if (rate == 3) {
      clearInterval(game);
      game_6 = setInterval(draw, 80);
    }
  }
  let game = setInterval(draw, 200);
}
