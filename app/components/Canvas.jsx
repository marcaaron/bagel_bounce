import React, { Component } from 'react';
// import bagel from '/images/bagel.png'

export default class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentDidMount() {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    let x = (window.innerWidth / 2) - 125;
    let y = (window.innerHeight / 2) - 125;
    let dx = 2;
    let dy = -2;
    let size = 250;
    let gravity = 0.2;
    let bounce = 0.7;
    let vx = 0;
    let vy = 1;
    function drawBagel() {
      let bagel = new Image();
      bagel.src = '/images/bagel.png'
      ctx.drawImage(bagel, x, y, size, size)
    }
    function draw() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBagel();
      x += dx;
      y += dy;
      if (y + dy < -10 || y + dy > canvas.height - size + 10) {
        dy = -dy;
      }
      if (x + dx > canvas.width - size + 10 || x + dx < -10) {
        dx = -dx;
      }
    }
    setInterval(draw, 10);
  }

  render() {
    console.log('i rendered')
    return (
      <div>
        <canvas id='canvas'></canvas>
      </div>
    )
  }
}
