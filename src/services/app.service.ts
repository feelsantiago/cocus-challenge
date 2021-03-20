import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
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
            ),
        );
    }

    public getRepositoryBranches(username: string, repository: string): Observable<Branch[]> {
        return this.gitClientService.listRepositoryBranches(username, repository);
    }
}
