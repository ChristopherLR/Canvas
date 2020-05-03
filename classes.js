class Circle {
  constructor(x, y, radius, dx = 0, dy = 0) {
    this.x = x;
    this.y = y;
    this.issue_x = 0;
    this.issue_y = 0;
    this.radius = radius;
    this.original_dx = dx;
    this.original_dy = dy;
    this.dx = dx;
    this.dy = dy;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.original_a = 0.3;
    this.a = 0.3;
    this.mouse = undefined;
  }

  follow_mouse(mouse) {
    this.mouse = mouse;
  }

  in_bound_x() {
    return this.x + this.radius < canvas.width && this.x - this.radius > 0;
  }

  in_bound_y() {
    return this.y + this.radius < canvas.height && this.y - this.radius > 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    ctx.stroke();
    ctx.fill();
  }

  update(x = this.x, y = this.y, radius = this.radius) {
    let chase = this.original_dx > 0 && this.original_dy > 0;

    if (this.mouse.defined) {
      if (this.in_bound_x() || chase) {
        this.x += (mouse.x - this.x) * this.original_dx;
      } else {
        this.x += 0;
      }
      if (this.in_bound_y() || chase) {
        this.y += (mouse.y - this.y) * this.original_dy;
      } else {
        this.y += 0;
      }
    } else {
      if (!this.in_bound_x()) {
        this.dx = -this.dx;
        this.issue_x++;
      } else {
        this.issue_x = 0;
      }
      if (!this.in_bound_y()) {
        this.dy = -this.dy;
        this.issue_y++;
      } else {
        this.issue_y = 0;
      }
      this.x += 10 * this.dx;
      this.y += 10 * this.dy;

      if (this.issue_y > 10) {
        if (this.y + this.radius >= canvas.height) this.y -= this.radius;
        if (this.y - this.radius <= 0) this.y += this.radius;
      }
      if (this.issue_x > 10) {
        if (this.x + this.radius >= canvas.width) this.x -= this.radius;
        if (this.x - this.radius <= 0) this.x += this.radius;
      }
    }
    this.draw();
  }

  set_colour(r, g, b, a = 0) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    return this;
  }
}

class Mouse {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.defined = false;
  }
  toggle() {
    this.defined = !this.defined;
  }
}
