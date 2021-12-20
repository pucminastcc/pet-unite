import {ApiProperty} from '@nestjs/swagger';

export class ValidateLocalUserDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}
