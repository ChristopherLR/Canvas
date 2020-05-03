
ctx.clearRect(0, 0, canvas.width, canvas.height);

for (let i = 0; i < 20; i++) {
		ctx.beginPath();
		let x = Math.random() * window.innerWidth;
		let y = Math.random() * window.innerHeight;
		let r = Math.random() * 255,
				g = Math.random() * 255,
				b = Math.random() * 255;
		ctx.arc(x, y, 30, 0, Math.PI * 2, false);
		ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
		ctx.fill();
}

ctx.fillStyle = "rgba(250,0,0,0.1)";
ctx.fillRect(100, 100, 200, 200);
ctx.fillRect(150, 180, 200, 200);

ctx.beginPath();
ctx.moveTo(50, 300);
ctx.lineTo(200, 90);
ctx.strokeStyle = "#fa6666";
ctx.stroke();

