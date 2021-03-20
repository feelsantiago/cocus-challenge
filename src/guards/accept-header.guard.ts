import { CanActivate, ExecutionContext, Injectable, NotAcceptableException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AcceptHeaderGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const request: Request = context.switchToHttp().getRequest();

        const { accept } = request.headers;

        if (!accept || accept !== 'application/json') {
            throw new NotAcceptableException(`Invalid header 'Accept'! Valid format: application/json`);
        }

        return true;
    }
}
