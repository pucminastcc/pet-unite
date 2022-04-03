import {ApiProperty} from '@nestjs/swagger';
import {Types} from 'mongoose';

export class GetReportDto {
    @ApiProperty({default: '', required: true})
    id: Types.ObjectId;
}
