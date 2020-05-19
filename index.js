const server = require('./api/server.js');
const PORT = process.env.PORT || 3300;

server.get('/', async (req, res) => {
  res.json({
      message: 'The Sprint Challenge Authentication API is up'
  })
});

if (!module.parent) {
	server.listen(PORT, () => {
		console.log(`Running at http://localhost:${PORT}`);
	});
};

module.exports = server;