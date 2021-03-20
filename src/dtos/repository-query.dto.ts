import { IsBoolean, IsOptional } from 'class-validator';
import { ToBoolean } from '../utils/to-boolean';

export class RepositoryQueryDto {
    @IsOptional()
    @ToBoolean()
    @IsBoolean()
    public fullInformation: boolean;
}
