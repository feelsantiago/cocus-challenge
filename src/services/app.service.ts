import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GitClientService } from './git-client.service';
import { Owner, Repository } from '../types/git.types';
import { filterListMap } from '../utils/operators';

@Injectable()
export class AppService {
    constructor(private readonly gitClientService: GitClientService) {}

    public getUserRepositories(username: string, fullInformation = false): Observable<Partial<Repository>[]> {
        return this.gitClientService.listUserRepositories(username).pipe(
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
}
