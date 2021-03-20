import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { appProviders } from './app.provider';
import { AppService } from './app.service';
import { GitClientService } from './services/git-client.service';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [...appProviders, AppService, GitClientService],
})
export class AppModule {}
