import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { WebModule } from '@/web.module';

describe('Application (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WebModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close(); // Ensure application is closed after all tests
  });

  it('/healthcheck (GET)', () => {
    const res = request(app.getHttpServer()).get('/healthcheck');
    return res.expect(200);
  });
});
