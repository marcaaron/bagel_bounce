import React, { Component } from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentDidMount() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const gravity = 0.2;
    const bounce = 0.7;
    const buffer = 10;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let bagel = {
      selected: false,
      drag: false,
      size: 250,
      radius: 125,
      x: (canvas.width / 2) - 125,
      y: (canvas.height / 2) - 125,
      dx: 2,
      dy: -2,
      vy: 1,
      selectedX: null,
      selectedY: null,
      dragX: null,
      dragY: null,
      touchX: null,
      touchY: null,
      draw: function () {
        let img = new Image();
        img.src = '/images/bagel.png'
        ctx.drawImage(img, this.x, this.y, this.size, this.size)
      }
    };
    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      bagel.draw();
      bagel.x += bagel.dx
      bagel.y += bagel.vy;
      bagel.vy += gravity;
      if (bagel.selected & !bagel.drag) {
        //if bagel is staticly touched, stay there
        bagel.x = bagel.selectedX;
        bagel.y = bagel.selectedY;
      }
      // if (bagel.drag) {
      //   //if it is dragged, move it accordingly
      //   bagel.x += bagel.dragX;
      //   bagel.y += bagel.dragY;
      // }
      if (bagel.y + bagel.size > canvas.height + buffer) {
        //if it hits the floor, bounce
        bagel.y = (canvas.height + buffer) - bagel.size;
        bagel.vy *= -bounce;
        if (Math.abs(bagel.vy) < .8) {
          //if it also has low velocity, slow to stop
          bagel.dx *= bounce;
          bagel.dy *= bounce;
          bagel.vy = 0;
        }
      }
      if (bagel.y + bagel.dy <= -buffer) {
        //if it hits the top, reverse
        bagel.dy = -bagel.dy;
      }
      if (bagel.x + bagel.dx <= -buffer || bagel.x + bagel.dx > canvas.width - bagel.size + buffer) {
        //if it hits either side, reverse
        bagel.dx = -bagel.dx;
      }
    };
    //event listeners
    function handleTouchStart(e, x, y, size) {
      e.preventDefault();
      if (e && e.touches.length === 1) {
        let touchX = e.touches[0].pageX;
        let touchY = e.touches[0].pageY;
        let x1 = x + size;
        let y1 = y + size;
        if (touchX > x && touchX < x1 && touchY > y && touchY < y1) {
          //if bagel is touched, log the coordinates
          bagel.selected = true;
          bagel.selectedX = x;
          bagel.selectedY = y;
        }
      }
    };
    function handleTouchEnd(e) {
      e.preventDefault();
      if (bagel.selected) {
        bagel.selected = false,
          bagel.drag = false,
          bagel.selectedX = null,
          bagel.selectedY = null,
          bagel.dragX = null,
          bagel.dragY = null,
          bagel.touchX = null,
          bagel.touchY = null
      }
    };
    // function handleTouchMove(e, x, y) {
    //   // e.preventDefault();
    //   if (bagel.selected) {
    //     bagel.drag = true;
    //     let touchX = e.targetTouches[0].pageX;
    //     let touchY = e.targetTouches[0].pageY;
    //     bagel.dragX = bagel.touchX ? bagel.dragX - touchX : 0;
    //     bagel.dragY += bagel.touchY ? bagel.dragY - touchY : 0;
    //     bagel.touchX = e.targetTouches[0].pageX;
    //     bagel.touchY = e.targetTouches[0].pageY;
    //   }
    // };
    canvas.addEventListener('touchstart', (e) => {
      handleTouchStart(e, bagel.x, bagel.y, bagel.size)
    });
    // canvas.addEventListener('touchmove', (e) => {
    //   handleTouchMove(e, bagel.x, bagel.y, bagel.size)
    // });
    canvas.addEventListener('touchend', handleTouchEnd);
    //run update function continuously
    setInterval(update, 1000 / 60);
  }

  render() {
    // console.log('state',this.state)
    return (
      <canvas id='canvas'></canvas>
    )
  }
}
