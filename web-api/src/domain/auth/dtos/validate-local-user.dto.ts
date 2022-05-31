import {ApiProperty} from '@nestjs/swagger';

export class ValidateLocalUserDto {
    @ApiProperty({default: 'usuario@exemplo.com', description: 'Informar o email principal', required: true})
    email: string;
    @ApiProperty({default: '@Senha!23', description: 'Informar a senha', required: true})
    password: string;
}
