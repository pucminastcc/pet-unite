import {ApiProperty} from '@nestjs/swagger';
import {Types} from 'mongoose';

export class CreatePetDto {
    userId: Types.ObjectId;
    @ApiProperty({default: '', required: true})
    img: string ;
    @ApiProperty({default: '', required: true})
    name: string;
    @ApiProperty({default: '', required: true})
    petGenderId: string;
    @ApiProperty({default: '', required: true})
    breed: string;
    @ApiProperty({default: '', required: true})
    description: string;
}
