import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Repository } from './types/git.types';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('repositories/:username')
    public getHello(@Param('username') username: string): Observable<Partial<Repository>[]> {
        return this.appService.getUserRepositories(username);
    }
}
