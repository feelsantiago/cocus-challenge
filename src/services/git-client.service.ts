import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { from, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Repositories } from '../types/git.types';

@Injectable()
export class GitClientService {
    constructor(private readonly client: Octokit) {}

    public listUserRepositories(username: string): Observable<Repositories[]> {
        return from(this.client.repos.listForUser({ username })).pipe(
            pluck('data'),
            map((data) => data as Repositories[]),
        );
    }
}
