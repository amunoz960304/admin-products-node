import request from 'supertest';
import server from '../../server';
import { or } from 'sequelize';

describe('POST api/v1/products', () => {
  it('should display errors', async () => {
    const response = await request(server).post('/api/v1/products').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('should validate that the price is greater than 0', async () => {
    const response = await request(server).post('/api/v1/products').send({
      name: 'Computadora',
      price: 0,
      availability: true,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
  });

  it('should create a new product', async () => {
    const response = await request(server).post('/api/v1/products').send({
      name: 'Computadora',
      price: 10,
      availability: true,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('createdAt');

    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('GET api/v1/products/:id', () => {
  it('should get product by id', async () => {
    const response = await request(server).get(`/api/v1/products/${1}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should return error', async () => {
    const response = await request(server).get(`/api/v1/products/${2}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});

describe('GET api/v1/products/', () => {
  it('should get product by id', async () => {
    const response = await request(server).get(`/api/v1/products`);

    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
});

describe('PATCH api/v1/products/:id', () => {
  it('should update product by id', async () => {
    const response = await request(server).patch(`/api/v1/products/${1}`).send({
      name: 'Test update',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should display error message', async () => {
    const response = await request(server)
      .patch(`/api/v1/products/${10}`)
      .send({
        name: 'Test update',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});

describe('DELETE api/v1/products/:id', () => {
  it('should delete product by id', async () => {
    const response = await request(server).delete(`/api/v1/products/${1}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  it('should display error message', async () => {
    const response = await request(server).delete(`/api/v1/products/${10}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
