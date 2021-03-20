import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

    const config = new DocumentBuilder()
        .setTitle('Cocus Challenge - Git Integration')
        .setDescription('Simple API to see a user repositories and branches from GitHub')
        .setVersion('1.0')
        .addTag('cocus')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
void bootstrap();
