const server = require('./api/server.js');

const PORT = process.env.PORT || 3300;
// server.listen(PORT, () => {
//   console.log(`\n=== Server listening on port ${PORT} ===\n`);
// });

server.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({
		message: 'Something went wrong'
	});
});

if (!module.parent) {
	server.listen(port, () => {
		console.log(`Running at http://localhost:${port}`);
	});
};

module.exports = server;