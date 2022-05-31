import {Types} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';

export class DonatePetDto {
    userId: Types.ObjectId;
    @ApiProperty({default: '624a5b165d7b9a3f6a3c5641', description: 'Informar o ID do pet', required: true})
    petId: string;
    @ApiProperty({default: '624a461ae5ac8d49955684dc', description: 'Informar o ID da instituição', required: false})
    institutionId: string;
}
