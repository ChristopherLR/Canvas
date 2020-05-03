let socket = io();

socket.on('connect', () => {
		socket.send('Connected');
		console.log('Connected');
});

socket.on('reload', (data) => {
		location.reload();
		console.log('reloaded');
});
