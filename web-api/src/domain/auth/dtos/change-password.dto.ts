import {ApiProperty} from '@nestjs/swagger';

export class ChangePasswordDto {
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly code: string;
    @ApiProperty()
    password: string;
}
