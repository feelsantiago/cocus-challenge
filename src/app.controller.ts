import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiTags, ApiAcceptedResponse, ApiQuery } from '@nestjs/swagger';
import { AppService } from './services/app.service';
import { RepositoryQueryDto } from './dtos/repository-query.dto';
import { AcceptHeaderGuard } from './guards/accept-header.guard';
import { Repository } from './types/git.types';

@Controller()
@ApiAcceptedResponse({ content: { 'application/json': {}, 'application/xml': {} } })
@UseGuards(AcceptHeaderGuard)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiTags('cocus')
    @ApiQuery({ name: 'fullInformation', required: false, type: Boolean })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'perPage', required: false, type: Number })
    @Get('repositories/:username')
    public repositories(
        @Param('username') username: string,
        @Query() query: RepositoryQueryDto,
    ): Observable<Partial<Repository>[]> {
        return this.appService.getUserRepositories(username, query.fullInformation, query.page, query.perPage);
    }
}
