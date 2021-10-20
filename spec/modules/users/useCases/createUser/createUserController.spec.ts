import request from 'supertest';

import { app } from '@shared/app';

describe('createUserController', () => {
  it('test', async () => {
    const response = await request(app).post('/users').send({
      name: 'Foo Bar',
      email: 'foo@bar.com',
      password: 'foobar123',
    });

    expect(response.status).toBe(201);
  });
});
