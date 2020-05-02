import express from 'express';
import path from 'path';
import reload from 'reload';

const dir_name = path.resolve(path.dirname(''));
const app = express();
app.use(express.static(dir_name));
const port = 80;

app.get('/', (req, res) => {
		res.sendFile( path.join(dir_name + '/index.html'));
});

// Reload code here
reload(app).then(function (reloadReturned) {
		// reloadReturned is documented in the returns API in the README

		// Reload started, start web server
		server.listen(app.get('port'), function () {
				console.log('Web server listening on port ' + app.get('port'));
		});
}).catch(function (err) {
		console.error('Reload could not start, could not start server/sample app', err);
});

export default app;
