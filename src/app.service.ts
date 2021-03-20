import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GitClientService } from './services/git-client.service';
import { Repositories } from './types/git.types';
import { filterList } from './utils/operators';

@Injectable()
export class AppService {
    constructor(private readonly gitClientService: GitClientService) {}

    public getUserRepositories(username: string): Observable<Repositories[]> {
        return this.gitClientService.listUserRepositories(username).pipe(filterList((repository) => !repository.fork));
    }
}
