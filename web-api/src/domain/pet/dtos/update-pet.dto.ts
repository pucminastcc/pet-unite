import {ApiProperty} from '@nestjs/swagger';

export class UpdatePetDto {
    img: File;
    @ApiProperty({default: '', required: true})
    id: string;
    @ApiProperty({default: ''})
    name: string;
    @ApiProperty({default: ''})
    description: string;
}
