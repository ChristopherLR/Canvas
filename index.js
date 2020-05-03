import express from "express";
import path from "path";
// import WebSocket from "ws";
import http from "http";
import io from "socket.io";

const dir_name = path.resolve(path.dirname(""));
const app = express();

const server = http.createServer(app);

let s_io = io(server);
app.use(express.static(dir_name));

const port = 80;
// const ws = new WebSocket.Server({server});

app.get("/", (req, res) => {
  res.sendFile(path.join(dir_name + "/index.html"));
});

let count = 0;
s_io.on("connection", (socket) => {
		console.log(`Client ID: ${socket.conn.id}`);

		socket.on("message", (msg) => console.log(msg));
		socket.on("disconnect", (param) => console.log(param));
		if (count < 1) s_io.sockets.emit('reload', {});//
		count++;
});

server.listen(port, () => {
		console.log(`Server on port ${port}`);
		s_io.sockets.emit('reload', {});//
});
export default app;
