import {ApiProperty} from '@nestjs/swagger';

export class GetPetDto {
    @ApiProperty({default: '', required: true})
    id: string;
}
