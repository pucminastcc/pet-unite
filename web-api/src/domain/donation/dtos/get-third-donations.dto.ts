import {Types} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';

export class GetThirdDonationsDto {
    userId: Types.ObjectId;
    isInstitution: boolean;
    currentDate: Date;
    @ApiProperty({default: '', description: 'Informar o ID do tipo de pet', required: false})
    petTypeId: string;
    @ApiProperty({default: '', description: 'Informar o ID do gênero de pet', required: false})
    petGenderId: string;
    @ApiProperty({default: '', description: 'Informar o estado', required: false})
    state: string;
}
