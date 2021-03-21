/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpException, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Octokit } from '@octokit/rest';
import { GitClientService } from './git-client.service';

describe('GitClientService', () => {
    let gitClientService: GitClientService;
    let octoKit: Octokit;

    beforeEach(async () => {
        const providers: Provider[] = [
            {
                provide: Octokit,
                useFactory: () => new Octokit(),
            },
        ];

        const moduleRef = await Test.createTestingModule({
            controllers: [],
            providers: [...providers, GitClientService],
        }).compile();

        gitClientService = moduleRef.get<GitClientService>(GitClientService);
        octoKit = moduleRef.get<Octokit>(Octokit);
    });

    describe('listUserRepositories', () => {
        it('Should return a list of repositories', () => {
            const result = { data: [{ name: 'mock-repository', owner: 'mock-user' }] };

            jest.spyOn(octoKit.repos, 'listForUser').mockImplementation(() => Promise.resolve(result as any));
            gitClientService.listUserRepositories('mock-repository').subscribe(
                (value) => {
                    expect(value).toBe(result.data);
                },
                () => fail('it should not reach here'),
                () => expect(true).toBe(true),
            );
        });

        it('Should return a 404 error for not found user', () => {
            jest.spyOn(octoKit.repos, 'listForUser').mockImplementation(() =>
                Promise.reject({ error: 'Not Found', status: 404 }),
            );
            gitClientService.listUserRepositories('unknown user').subscribe(
                () => fail('it should not reach here'),
                (error) => {
                    expect(error).toBeInstanceOf(HttpException);
                    expect(error.status).toBe(404);
                },
                () => expect(true).toBe(true),
            );
        });
    });

    describe('listRepositoryBranches', () => {
        it('Should return a list of branches', () => {
            const result = { data: [{ name: 'mock-branch', commit: { sha: 'mock-sha', url: 'mock-url' } }] };

            jest.spyOn(octoKit.repos, 'listBranches').mockImplementation(() => Promise.resolve(result as any));
            gitClientService.listRepositoryBranches('mock-user', 'mock-repository').subscribe(
                (value) => {
                    expect(value).toBe(result.data);
                },
                () => fail('it should not reach here'),
                () => expect(true).toBe(true),
            );
        });

        it('Should return a 404 error for not found repository', () => {
            jest.spyOn(octoKit.repos, 'listForUser').mockImplementation(() =>
                Promise.reject({ error: 'Not Found', status: 404 }),
            );
            gitClientService.listUserRepositories('unknown user').subscribe(
                () => fail('it should not reach here'),
                (error) => {
                    expect(error).toBeInstanceOf(HttpException);
                    expect(error.status).toBe(404);
                },
            );
        });
    });

    describe('handleError', () => {
        it('Should return HttpException with error status', () => {
            const customError = { message: 'Custom Error', status: 400 };
            gitClientService.handleError(customError).subscribe(
                () => fail('it should not reach here'),
                (error) => {
                    expect(error).toBeInstanceOf(HttpException);
                    expect(error.message).toBe(customError.message);
                    expect(error.status).toBe(customError.status);
                },
                () => expect(true).toBe(true),
            );
        });

        it('Should return HttpException with error status 500', () => {
            const customError = { err: 'Something goes wrong' };
            gitClientService.handleError(customError as any).subscribe(
                () => fail('it should not reach here'),
                (error) => {
                    expect(error).toBeInstanceOf(HttpException);
                    expect(error.message).toBe('Git Client Error');
                    expect(error.status).toBe(500);
                },
                () => expect(true).toBe(true),
            );
        });
    });
});
/* eslint-enable @typescript-eslint/no-unsafe-return */
/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable prefer-promise-reject-errors */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
