import {ApiProperty} from '@nestjs/swagger';

export class GetUserAccountDto {
    @ApiProperty({default: '', required: true})
    id: string;
}
