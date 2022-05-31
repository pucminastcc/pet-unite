import {ApiProperty} from '@nestjs/swagger';
import {Types} from 'mongoose';

export class SignalDonationDto {
    userId: Types.ObjectId;
    username: string;
    @ApiProperty({default: '6291754477582dfee41c5afd', description: 'Informar o ID da doação', required: true})
    donationId: string;
}
