import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GitClientService } from './git-client.service';
import { Branch, Owner, Repository } from '../types/git.types';
import { filterListMap } from '../utils/operators';

@Injectable()
export class AppService {
    constructor(private readonly gitClientService: GitClientService) {}

    public getUserRepositories(
        username: string,
        fullInformation = false,
        page?: number,
        perPage?: number,
    ): Observable<Partial<Repository>[]> {
        return this.gitClientService.listUserRepositories(username, page, perPage).pipe(
            filterListMap(
                (repository) => !repository.fork,
                (repository) => {
                    if (fullInformation) {
                        return repository;
                    }

                    const { owner, name } = repository;
                    return { name, owner: (owner as Owner).login };
                },
                (repository) =>
                    this.getRepositoryBranches(username, repository.name).pipe(
                        map((branches) => ({ ...repository, branches })),
                    ),
            ),
        );
    }

    public getRepositoryBranches(username: string, repository: string): Observable<Branch[]> {
        return this.gitClientService.listRepositoryBranches(username, repository).pipe(
            filterListMap(
                () => true,
                ({ name, commit }) => ({ name, commit }),
            ),
        );
    }
}
