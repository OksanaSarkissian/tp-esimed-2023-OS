const request = require('supertest');
const apiUrl = 'http://localhost:3000';

describe('Failed login', () => {
  test('user exist password wrong', async () => {
    const res = await request(apiUrl).post('/auth/login').send({
      firstName: 'Lorem',
      password: 'blablabla',
    });
    console.log(res.text);
    expect(res.statusCode).toEqual(401);
    expect(res.text);
  });

  test('user doesnt exist', async () => {
    const res = await request(apiUrl).post('/auth/login').send({
      firstName: 'louis',
      password: 'blabla',
    });
    console.log(res.text);
    expect(res.statusCode).toEqual(400);
    expect(res.text);
  });

  test('POST /auth/login => without firstName', async () => {
    const res = await request(apiUrl).post('/auth/login').send({
      password: 'password',
    });

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual('Property "req.body.firstName": Invalid value. Current value = undefined');
  });

  test('POST /auth/login => with wrong firstName', async () => {
    const res = await request(apiUrl).post('/auth/login').send({
      firstName: 'fake',
      password: 'password',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('Unauthorized');
  });
});

describe('Success login', () => {
  test('all good', async () => {
    const res = await request('http://localhost:3000').post('/auth/login').send({
      firstName: 'Lorem',
      password: 'password',
    });
    console.log(res.text);
    expect(res.statusCode).toEqual(200);
    expect(res.text);
    global.token = res.text;
  });
});
