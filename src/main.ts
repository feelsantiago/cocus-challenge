import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    app.use(helmet());

    app.useGlobalPipes(
        new ValidationPipe({
            forbidUnknownValues: true,
            validationError: { target: false, value: true },
        }),
    );

    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(3000);
}
void bootstrap();
