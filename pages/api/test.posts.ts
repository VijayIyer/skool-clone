// pages/api/posts.test.ts

import request from 'supertest';
import { server } from '../../pages/api/server'; 

describe('POST /api/posts', () => {

  it('creates a new post', async () => {
    const res = await request(server)
      .post('/api/posts')
      .send({ 
        content: 'Hello world' 
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.content).toEqual('Hello world');
  });

});