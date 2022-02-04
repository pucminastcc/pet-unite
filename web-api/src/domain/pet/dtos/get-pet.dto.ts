import {ApiProperty} from '@nestjs/swagger';
import {Types} from 'mongoose';

export class GetPetDto {
    userId: Types.ObjectId;
    @ApiProperty({default: '', required: true})
    id: string;
}
