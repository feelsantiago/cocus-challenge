import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { RepositoryQueryDto } from './dtos/repository-query.dto';
import { Repository } from './types/git.types';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('repositories/:username')
    public getHello(
        @Param('username') username: string,
        @Query() query: RepositoryQueryDto,
    ): Observable<Partial<Repository>[]> {
        return this.appService.getUserRepositories(username, query.fullInformation);
    }
}
