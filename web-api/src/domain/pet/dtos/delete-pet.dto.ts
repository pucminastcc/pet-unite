import {ApiProperty} from '@nestjs/swagger';
import {Types} from 'mongoose';

export class DeletePetDto {
    userId: Types.ObjectId;
    @ApiProperty()
    id: string;
}
