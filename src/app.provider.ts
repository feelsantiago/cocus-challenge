import { Provider } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

export const appProviders: Provider[] = [
    {
        provide: Octokit,
        useFactory: () => new Octokit({ auth: 'f5966d5b536cd5fcaae303be842deef12a8b0d07' }),
        inject: [],
    },
];
