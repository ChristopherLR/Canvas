
let canvas = document.querySelector('canvas');

console.log("Hello");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(50, 300);
