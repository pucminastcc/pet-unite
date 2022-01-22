import {ApiProperty} from '@nestjs/swagger';

export class CreatePetDto {
    img: File;
    @ApiProperty({default: '', required: true})
    name: string;
    @ApiProperty({default: '', required: true})
    description: string;
}
