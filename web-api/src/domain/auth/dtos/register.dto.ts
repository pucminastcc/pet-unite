import {ApiProperty} from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly username: string;
    @ApiProperty()
    password: string;
    terms: boolean;
    activated: boolean;
    provider: string;
    img: string;
}
