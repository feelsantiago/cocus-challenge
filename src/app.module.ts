import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { appProviders } from './app.provider';
import { AppService } from './services/app.service';
import { AcceptHeaderGuard } from './guards/accept-header.guard';
import { GitClientService } from './services/git-client.service';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    controllers: [AppController],
    providers: [...appProviders, AcceptHeaderGuard, AppService, GitClientService],
})
export class AppModule {}
