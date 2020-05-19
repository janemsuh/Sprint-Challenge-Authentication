
const supertest = require('supertest');
const server = require('../index');
const db = require('../database/dbConfig');

afterAll(async () => {
	await db.destroy();
});

describe('users integration tests', () => {

	it('POST /api/auth/register', async () => {
		const data = { username: 'cbrown', password: 'snoopyismybff' };
		const res = await supertest(server).post('/api/auth/register').send(data);
		expect(res.statusCode).toBe(201);
		expect(res.body.username).toBe('cbrown');
    });

    it('POST /api/auth/login', async () => {
		const data = { username: 'cbrown', password: 'snoopyismybff' };
		const res = await supertest(server).post('/api/auth/login').send(data);
		expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
    });

    it('POST /api/auth/login (user not found)', async () => {
		const data = { username: 'sbrown', password: 'iheartlinus' };
		const res = await supertest(server).post('/api/auth/login').send(data);
		expect(res.statusCode).toBe(500);
		expect(res.type).toBe('application/json');
    });
});