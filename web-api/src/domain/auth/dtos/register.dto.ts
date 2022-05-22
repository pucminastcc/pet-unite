import {ApiProperty} from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({default: 'email@exemplo.com', required: true})
    readonly email: string;
    @ApiProperty({default: 'usuario', required: true})
    readonly username: string;
    @ApiProperty({default: '12345678', required: true})
    password: string;
    terms: boolean;
    activated: boolean;
    provider: string;
    img: string;
}
