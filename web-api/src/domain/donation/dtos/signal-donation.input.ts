import {ApiProperty} from '@nestjs/swagger';
import {Types} from 'mongoose';

export class SignalDonationInput {
    userId: Types.ObjectId;
    username: string;
    @ApiProperty({default: '', required: true})
    donationId: Types.ObjectId;
}
