import {ApiProperty} from '@nestjs/swagger';

export class DeletePetDto {
    @ApiProperty()
    id: string;
}
