const supertest = require('supertest');
const server = require('../index');
const db = require('../database/dbConfig');

beforeEach(async () => {
	await db.seed.run();
});

afterAll(async () => {
	await db.destroy();
});

describe('users integration tests', () => {

	it('POST /api/auth/register', async () => {
		const data = { username: 'anonymous', password: 'whatistime' };
		const res = await supertest(server).post('/api/auth/register').send(data);
		expect(res.statusCode).toBe(201);
		// expect(res.type).toBe('application/json');
		expect(res.body.username).toBe(data.username);
    });

    // it('POST /api/auth/login', async () => {
	// 	const data = { username: 'sbrown', password: 'iheartlinus' };
	// 	const res = await supertest(server).post('/api/auth/login').send(data);
	// 	// expect(res.statusCode).toBe(200);
	// 	expect(res.type).toBe('application/json');
	// 	// expect(res.validPassword).toBe(true);
    // });
});