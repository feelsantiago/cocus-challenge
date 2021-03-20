import { HttpException, Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
            catchError((error) => this.handleError(error)),
        );
    }

    private handleError(error: { message: string; status: number }): Observable<never> {
        return throwError(new HttpException(error.message || 'Git Client Error', error.status || 500));
    }
}
