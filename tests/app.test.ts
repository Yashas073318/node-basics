import type { Response } from 'supertest';
import request from 'supertest';

import { createApp } from '../src/app.js';

describe('API', () => {
  const app = createApp();

  it('returns welcome message', async () => {
    const res: Response = await request(app).get('/');
    const payload = res.body as { message: string };
    expect(res.status).toBe(200);
    expect(payload.message).toMatch(/node-basics/);
  });

  it('creates a task', async () => {
    const res: Response = await request(app).post('/api/tasks').send({ title: 'New' });
    const payload = res.body as { title: string };
    expect(res.status).toBe(201);
    expect(payload.title).toBe('New');
  });
});
