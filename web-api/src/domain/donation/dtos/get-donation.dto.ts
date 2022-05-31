import {ApiProperty} from '@nestjs/swagger';
import {Types} from 'mongoose';

export class GetDonationDto {
    @ApiProperty({default: '', required: true})
    donationId: string;
}
