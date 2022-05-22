import {ApiProperty} from '@nestjs/swagger';
import {Types} from 'mongoose';

export class ViewDonationDto {
    @ApiProperty({default: '', required: true})
    donationId: Types.ObjectId;
}
