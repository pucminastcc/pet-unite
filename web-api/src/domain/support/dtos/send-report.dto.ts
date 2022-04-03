import {ApiProperty} from '@nestjs/swagger';
import {Types} from 'mongoose';

export class SendReportDto {
    username: string;
    email: string;
    userId: string;
    date: string;
    @ApiProperty({default: '', required: true})
    subject: string;
    @ApiProperty({default: new Types.ObjectId('620317f8a7c6a4b23b8986d3'), required: true})
    reportTypeId: string;
    @ApiProperty({default: '', required: true})
    description: string;
}
