class Object {
  constructor(id, x, y, Xspeed, Yspeed) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.Xspeed = Xspeed;
    this.Yspeed = Yspeed;
  }

  update(dt) {
    this.x += dt * this.Xspeed;
    this.y -= dt * this.Yspeed;
  }

  distanceTo(object) {
    const dx = this.x - object.x;
    const dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  setDirection(Xspeed, Yspeed) {
    this.Xspeed = Xspeed;
    this.Yspeed = Yspeed;
  }

  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
    };
  }
}

module.exports = Object;
