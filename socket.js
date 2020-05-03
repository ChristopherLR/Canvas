let socket = io("http://192.168.1.133:5670/");

socket.on('connect', () => {
		socket.send('Connected');
		console.log('Connected');
});

socket.on('reload', (data) => {
		location.reload();
		console.log('reloaded');
});
