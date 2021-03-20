import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from '@octokit/rest';

export const appProviders: Provider[] = [
    {
        provide: Octokit,
        useFactory: (configService: ConfigService): Octokit => {
            const logger = new Logger('GitClient');
            const token = configService.get<string>('GIT_PERSONAL_ACCESS_TOKEN');

            const client = new Octokit({
                auth: token,
                log: {
                    debug: () => {},
                    info: (message) => logger.log(message),
                    warn: (message) => logger.warn(message),
                    error: (message) => logger.error(message),
                },
            });

            return client;
        },
        inject: [ConfigService],
    },
];
