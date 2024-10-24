const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');

describe('GET /items', () => {
    it('should return an empty array initially', async () => {
        const res = await request(app).get('/items');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array').that.is.empty;
    });
});

describe('POST /items', () => {
    it('should add a new item', async () => {
        const res = await request(app)
            .post('/items')
            .send({ name: 'Item 1' });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('name', 'Item 1');
        expect(res.body).to.have.property('id');
    });

    it('should return a 400 error if name is not provided', async () => {
        const res = await request(app).post('/items').send({});
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'Name is required');
    });
});
