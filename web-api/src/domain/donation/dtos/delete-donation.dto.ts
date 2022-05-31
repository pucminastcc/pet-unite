import {Types} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';

export class DeleteDonationDto {
    userId: Types.ObjectId;
    @ApiProperty({default: '', description: 'Informar o ID da doação', required: true})
    donationId: string;
    @ApiProperty({default: '', description: 'Informar o ID do pet', required: true})
    petId: string;
}
