import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ToBoolean } from '../utils/to-boolean';

export class RepositoryQueryDto {
    @IsOptional()
    @ToBoolean()
    @IsBoolean()
    public fullInformation: boolean;

    @IsOptional()
    @IsNumber()
    public page: number;

    @IsOptional()
    @IsNumber()
    public perPage: number;
}
