import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('Application');

    app.setGlobalPrefix('api');

    app.use(helmet());
    app.use(
        morgan('combined', {
            stream: {
                write(message) {
                    logger.log(message);
                },
            },
        }),
    );

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            forbidUnknownValues: true,
            validationError: { target: false, value: true },
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    const httpHost = app.get<HttpAdapterHost>(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpHost.httpAdapter));

    await app.listen(3000);
}
void bootstrap();
