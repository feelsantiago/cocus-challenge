/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Octokit } from '@octokit/rest';
import { of } from 'rxjs';
import { GitClientService } from './git-client.service';
import { AppService } from './app.service';

describe('AppService', () => {
    let gitClientService: GitClientService;
    let appService: AppService;

    beforeEach(async () => {
        const providers: Provider[] = [
            {
                provide: Octokit,
                useFactory: () => new Octokit(),
            },
        ];

        const moduleRef = await Test.createTestingModule({
            controllers: [],
            providers: [...providers, AppService, GitClientService],
        }).compile();

        gitClientService = moduleRef.get<GitClientService>(GitClientService);
        appService = moduleRef.get<AppService>(AppService);
    });

    describe('getRepositoryBranches', () => {
        it('Should return only the name and commit for each branch', () => {
            const branches = [
                {
                    name: 'mock-branch',
                    commit: {
                        sha: 'mock-sha',
                        url: 'mocj-url',
                    },
                    other: 'moch-other-property',
                },
            ];

            jest.spyOn(gitClientService, 'listRepositoryBranches').mockImplementation(() => of(branches));

            appService.getRepositoryBranches('mock-user', 'mock-repository').subscribe(
                (values) => {
                    const keys = ['name', 'commit'];

                    expect(Array.isArray(values)).toBe(true);
                    expect(values.length).toBe(1);
                    expect(Object.keys(values[0]).length).toBe(2);
                    expect(Object.keys(values[0]).sort()).toEqual(keys.sort());
                },
                () => fail('it should not reach here'),
                () => expect(true).toBe(true),
            );
        });
    });

    describe('getUserRepositories', () => {
        it('Should return a list of repository with branches', () => {
            const repositories = [
                {
                    owner: 'mock-user',
                    name: 'mock-repository',
                },
            ];

            const branches = [
                {
                    name: 'mock-branch',
                    commit: {
                        sha: 'mock-sha',
                        url: 'mock-url',
                    },
                },
            ];

            jest.spyOn(gitClientService, 'listUserRepositories').mockImplementation(() => of(repositories) as any);
            jest.spyOn(gitClientService, 'listRepositoryBranches').mockImplementation(() => of(branches));

            appService.getUserRepositories('mock-user').subscribe(
                (values) => {
                    expect(Array.isArray(values)).toBe(true);
                    expect(values.length).toBe(1);
                    expect(Array.isArray(values[0].branches)).toBe(true);
                    expect(values[0].branches[0]).toStrictEqual(branches[0]);
                },
                () => fail('it should not reach here'),
                () => expect(true).toBe(true),
            );
        });
    });
});
/* eslint-enable @typescript-eslint/no-unsafe-return */
/* eslint-enable @typescript-eslint/no-explicit-any */
