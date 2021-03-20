import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './services/app.service';
import { RepositoryQueryDto } from './dtos/repository-query.dto';
import { AcceptHeaderGuard } from './guards/accept-header.guard';
import { Repository } from './types/git.types';

@Controller()
@UseGuards(AcceptHeaderGuard)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('repositories/:username')
    public getHello(
        @Param('username') username: string,
        @Query() query: RepositoryQueryDto,
    ): Observable<Partial<Repository>[]> {
        return this.appService.getUserRepositories(username, query.fullInformation, query.page, query.perPage);
    }
}
