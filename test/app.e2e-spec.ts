/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from '../src/types/git.types';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    const username = 'feelsantiago';

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                forbidUnknownValues: true,
                validationError: { target: false, value: true },
                transformOptions: { enableImplicitConversion: true },
            }),
        );

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/repositories/:username (GET) Content-Type: application/json', async () => {
        const res = await request(app.getHttpServer())
            .get(`/repositories/${username}`)
            .set('Accept', 'application/json')
            .send();

        expect(res.header['content-type']).toContain('application/json');
        expect(res.status).toBe(200);

        const repository = res.body[0] as Repository;
        const minimalKeys = ['owner', 'name', 'branches'];
        const branches = ['name', 'commit'];

        expect(Array.isArray(res.body)).toBe(true);
        expect(Array.isArray(repository.branches)).toBe(true);
        expect(Object.keys(repository).sort()).toEqual(minimalKeys.sort());
        expect(Object.keys(repository.branches[0]).sort()).toEqual(branches.sort());
    });

    it('/repositories/:username (GET) Content-Type: application/xml', async () => {
        const res = await request(app.getHttpServer())
            .get(`/repositories/${username}`)
            .set('Accept', 'application/xml')
            .send();

        expect(res.status).toBe(406);
    });

    it('/repositories/:username (GET) Not Found User', async () => {
        const res = await request(app.getHttpServer())
            .get(`/repositories/asdjuhhsbzzzz456`)
            .set('Accept', 'application/json')
            .send();

        expect(res.status).toBe(404);
    });

    it('/repositories/:username?fullInformation=false (GET)', async () => {
        const res = await request(app.getHttpServer())
            .get(`/repositories/${username}?fullInformation=false`)
            .set('Accept', 'application/json')
            .send();

        expect(res.header['content-type']).toContain('application/json');
        expect(res.status).toBe(200);

        const repository = res.body[0] as Repository;
        const minimalKeys = ['owner', 'name', 'branches'];
        const branches = ['name', 'commit'];

        expect(Array.isArray(res.body)).toBe(true);
        expect(Array.isArray(repository.branches)).toBe(true);
        expect(Object.keys(repository).sort()).toEqual(minimalKeys.sort());
        expect(Object.keys(repository.branches[0]).sort()).toEqual(branches.sort());
    });

    it('/repositories/:username?fullInformation=true (GET)', async () => {
        const res = await request(app.getHttpServer())
            .get(`/repositories/${username}?fullInformation=true`)
            .set('Accept', 'application/json')
            .send();

        expect(res.header['content-type']).toContain('application/json');
        expect(res.status).toBe(200);

        const repository = res.body[0] as Repository;
        const branches = ['name', 'commit'];

        expect(Array.isArray(res.body)).toBe(true);
        expect(Array.isArray(repository.branches)).toBe(true);
        expect(Object.keys(repository).length).toBeGreaterThan(3);
        expect(Object.keys(repository.branches[0]).sort()).toEqual(branches.sort());
    });

    it('/repositories/:username?fullInformation=asd (GET) Not boolean value', async () => {
        const res = await request(app.getHttpServer())
            .get(`/repositories/${username}?fullInformation=asd`)
            .set('Accept', 'application/json')
            .send();

        expect(res.header['content-type']).toContain('application/json');
        expect(res.status).toBe(400);
    });

    it('/repositories/:username?page=1&perPage=2 (GET) Pagination', async () => {
        const res = await request(app.getHttpServer())
            .get(`/repositories/${username}?page-1&perPage=2`)
            .set('Accept', 'application/json')
            .send();

        expect(res.header['content-type']).toContain('application/json');
        expect(res.status).toBe(200);

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });
});
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
