import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register user, login, and access protected route', async () => {
    const user = { username: 'testuser2', password: 'test1232' };

    await request(app.getHttpServer()).post('/users').send(user).expect(201);

    const loginRes = await request(app.getHttpServer()).post('/auth/login').send(user).expect(201);
    expect(loginRes.body).toHaveProperty('access_token');
    const token = loginRes.body.access_token;

    await request(app.getHttpServer())
      .get('/posts')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await request(app.getHttpServer()).get('/posts').expect(401);
  });
});
