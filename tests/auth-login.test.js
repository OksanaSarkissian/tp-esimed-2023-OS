const request = require('supertest');

test('user exist password wrong', async () => {
    const res = await request('http://localhost:3000')
      .post('/auth/login')
      .send({
        firstName: 'oksana',
        password: 'blabla'
      })
      console.log(res.text);
    expect(res.statusCode).toEqual(401)
    expect(res.text);
  });

  test('user doesnt exist', async () => {
    const res = await request('http://localhost:3000')
      .post('/auth/login')
      .send({
        firstName: 'louis',
        password: 'blabla'
      })
      console.log(res.text);
    expect(res.statusCode).toEqual(400)
    expect(res.text);
  });

  test('all good', async () => {
    const res = await request('http://localhost:3000')
      .post('/auth/login')
      .send({
        firstName: 'oksana',
        password: 'testlength'
      })
      console.log(res.text);
    expect(res.statusCode).toEqual(200)
    expect(res.text);
  });