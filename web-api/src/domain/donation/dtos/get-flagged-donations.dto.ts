import {Types} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';

export class GetFlaggedDonationsDto {
    userId: Types.ObjectId;
    @ApiProperty({default: false, description: 'Informar se a doação é para uma instituição', required: true})
    donatedToInstitution: boolean;
}
