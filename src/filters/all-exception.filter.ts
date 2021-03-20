import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    public catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse();
        const request: Request = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof Error ? exception.message : 'Internal Server Error';

        response.status(status).json({
            status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
