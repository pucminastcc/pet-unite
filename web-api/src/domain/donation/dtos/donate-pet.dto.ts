import {Types} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';

export class DonatePetDto {
    userId: Types.ObjectId;
    @ApiProperty({default: '', required: true})
    petId: Types.ObjectId;
}
