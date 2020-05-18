const supertest = require('supertest');
const server = require('../index');

test('GET /', async () => {
	const endpoint = '/';
	const status = 200;

	const res = await supertest(server).get(endpoint);
	
	expect(res.statusCode).toBe(status);
	expect(res.type).toBe('application/json');
	expect(res.body.message).toBe('The Sprint Challenge Authentication API is up');
});