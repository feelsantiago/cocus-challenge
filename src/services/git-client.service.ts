import { HttpException, Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators';
import { Branch, Repository } from '../types/git.types';

@Injectable()
export class GitClientService {
    constructor(private readonly client: Octokit) {}

    public listUserRepositories(username: string, page?: number, perPage?: number): Observable<Repository[]> {
        return from(this.client.repos.listForUser({ username, page, per_page: perPage })).pipe(
            pluck('data'),
            map((data) => data as Repository[]),
            catchError((error) => this.handleError(error)),
        );
    }

    public listRepositoryBranches(username: string, repository: string): Observable<Branch[]> {
        return from(
            this.client.repos.listBranches({
                owner: username,
                repo: repository,
            }),
        ).pipe(
            pluck('data'),
            map((data) => data as Branch[]),
            catchError((error) => this.handleError(error)),
        );
    }

    private handleError(error: { message: string; status: number }): Observable<never> {
        return throwError(new HttpException(error.message || 'Git Client Error', error.status || 500));
    }
}
