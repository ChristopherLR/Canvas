let canvas = document.querySelector("canvas");
let mouse = new Mouse();
window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

let crcs = [];
let selected = new Set();
let chosen = new Set();
let single = [];

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("click", () => {
  let count = 0;
  crcs.map((crc) => {
    if (crc.in_bound_x() && crc.in_bound_y()) count++;
  });
  console.log(`Circle in bounds: ${count}`);
  mouse.toggle();
  console.log(mouse);
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 32) {
    crcs.map((crc) => {
      crc.original_dx = -crc.original_dx;
      crc.dx = -crc.original_dx;
      crc.original_dy = -crc.original_dy;
      crc.dy = -crc.original_dy;
    });
  }
  if (event.keyCode == 83) {
    console.log(selected.entries());
    selected.forEach((crc) => console.log(crc));
  }
  if (event.keyCode == 67) {
    crcs.map((crc) => {
      let x_dist = Math.abs(mouse.x - crc.x);
      let y_dist = Math.abs(mouse.y - crc.y);
      if (y_dist < crc.radius && x_dist < crc.radius) {
        chosen.add(crc);
        crc.original_a = 1;
      }
    });
    chosen.forEach((c) => single.push(c));
  }
  console.log(event.keyCode);
  console.log(mouse);
});

console.log("Canvas.js Loaded");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

for (let i = 0; i < 300; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  let r = Math.random() * 40;
  let p_n = Math.random() > 0.5 ? 1 : -1;
  let d = Math.random() * 0.1;
  let red = Math.random() * 255,
    green = Math.random() * 255,
    blue = Math.random() * 255;
  let crc = new Circle(x, y, r, d * p_n, d * p_n).set_colour(
    red,
    green,
    blue,
    0.3
  );
  crc.follow_mouse(mouse);
  crcs.push(crc);
}

const animate = () => {
  ctx.fillStyle = "#37474F";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  crcs.map((crc) => {
    let x_dist = Math.abs(mouse.x - crc.x);
    let y_dist = Math.abs(mouse.y - crc.y);
    if (y_dist < crc.radius && x_dist < crc.radius) {
      selected.add(crc);
    } else {
      selected.delete(crc);
    }
    if (selected.has(crc)) {
      crc.a = 1;
    } else {
      crc.a = crc.original_a;
    }
    crc.update();
  });
};

animate();
