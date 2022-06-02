import {ApiProperty} from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({default: 'usuario@exemplo.com', description: 'Informar o email', required: true})
    readonly email: string;
    @ApiProperty({default: 'Usuário', description: 'Informar o nome de apresentação', required: true})
    readonly username: string;
    @ApiProperty({default: 'usuario@!123', description: 'Informar a senha', required: true})
    password: string;
    terms: boolean;
    activated: boolean;
    provider: string;
    img: string;
}
