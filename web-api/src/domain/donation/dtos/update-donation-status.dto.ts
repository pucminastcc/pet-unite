import {Types} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateDonationStatusDto {
    userId: Types.ObjectId;
    username: string;
    @ApiProperty({default: '62943e8323a7c525a6520ec8', description: 'Informar o ID da doação', required: true})
    donationId: string;
    data: any;
}
