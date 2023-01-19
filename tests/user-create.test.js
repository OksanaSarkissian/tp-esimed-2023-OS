/* global apiUrl */
const request = require('supertest');
const { User } = require('../src/models/user.model.js');

describe('Test user creation', () => {
  test('POST /users => success', async () => {
    const res = await request(apiUrl).post('/users').send({
      firstName: 'Oksana',
      lastName: 'sarkissian',
      password: 'testlength',
      isAdmin: false,
    });

    expect(res.statusCode).toEqual(201);
    await User.destroy({
      where: { firstName: 'Oksana', lastName: 'sarkissian' },
    });
  });

  test("POST /users => without 'lastName' should fail", async () => {
    const res = await request(apiUrl).post('/users').send({
      firstName: 'Oksana',
      password: 'testlength',
      isAdmin: false,
    });

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual('Property "req.body.lastName": Invalid value. Current value = undefined');
  });

  test("POST /users => with short 'password' should fail", async () => {
    const res = await request(apiUrl).post('/users').send({
      firstName: 'Oksana',
      lastName: 'sarkissian',
      password: 'oups',
      isAdmin: false,
    });

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual('Property "req.body.password": Invalid value. Current value = oups');
  });
});
