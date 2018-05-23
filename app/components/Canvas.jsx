import React, { Component } from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.handleTouch = this.handleTouch.bind(this)
  }

  componentDidMount() {
    // const canvas = document.getElementById('canvas')
    // const ctx = canvas.getContext('2d')
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // let bagel = {
    //   size: 250,
    //   radius: 125,
    //   x: (canvas.width/2)-125,
    //   y: (canvas.height/2)-125,
    //   dx: 2,
    //   dy: -2,
    //   draw: function(){
    //     let img = new Image();
    //     img.src = '/images/bagel.png'
    //     ctx.drawImage(img, this.x, this.y, 250, 250)
    //   }
    // }
    // function draw() {
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   bagel.draw();
    //   bagel.x += bagel.dx;
    //   bagel.y += bagel.dy;
    //   if (bagel.y + bagel.dy < -10 || bagel.y + bagel.dy > window.innerHeight - bagel.size + 10) {
    //     bagel.dy = -bagel.dy;
    //   }
    //   if (bagel.x + bagel.dx > window.innerWidth - bagel.size + 10 || bagel.x + bagel.dx < -10) {
    //     bagel.dx = -bagel.dx;
    //   }
    // }
    // setInterval(draw, 10);
    ///////////
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let gravity = 0.2;
    let bounce = 0.7;
    let bagel = {
      size: 250,
      radius: 125,
      x: (canvas.width / 2) - 125,
      y: (canvas.height / 2) - 125,
      dx: 2,
      dy: -2,
      vx: 0,
      vy: 1,
      draw: function () {
        let img = new Image();
        img.src = '/images/bagel.png'
        ctx.drawImage(img, this.x, this.y, this.size, this.size)
      }
    }
    function clear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function update() {
      clear();
      bagel.draw();
      bagel.x += bagel.dx
      bagel.y += (bagel.vy + bagel.dy);
      bagel.vy += gravity;
      if (bagel.y + bagel.size > (canvas.height + 10)) {
        bagel.y = (canvas.height + 10) - bagel.size;
        bagel.vy *= -bounce;
      }
      if (bagel.y + bagel.dy < -10 || bagel.y + bagel.dy > window.innerHeight - bagel.size + 10) {
        bagel.dy = -bagel.dy;
      }
      if (bagel.x + bagel.dx > window.innerWidth - bagel.size + 10 || bagel.x + bagel.dx < -10) {
        bagel.dx = -bagel.dx;
      }
    }
    canvas.addEventListener('touchstart', this.handleTouch)

    setInterval(update, 1000 / 60)
  }

  handleTouch(e) {
    if (e && e.touches.length === 1) {
      let touch = e.touches[0];
      let touchX = touch.pageX;
      let touchY = touch.pageY;
      // touchX=touch.pageX-touch.target.offsetLeft;
      // touchY=touch.pageY-touch.target.offsetTop;
      console.log(touchX, touchY)
      // }
    }
  }

  render() {
    return (
      <canvas id='canvas'></canvas>
    )
  }
}
