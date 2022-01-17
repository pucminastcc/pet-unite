import {ApiProperty} from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({default: 'sistema@exemplo.com', required: true})
    readonly email: string;
    @ApiProperty({default: 'sistema', required: true})
    readonly username: string;
    @ApiProperty({default: '#@Senha!123', required: true})
    password: string;
    terms: boolean;
    activated: boolean;
    provider: string;
    img: string;
}
