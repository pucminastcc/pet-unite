import {ApiProperty} from '@nestjs/swagger';

export class ValidateLocalUserDto {
    @ApiProperty({default: 'usuario@exemplo.com', description: 'Informar o email', required: true})
    email: string;
    @ApiProperty({default: 'usuario@!123', description: 'Informar a senha', required: true})
    password: string;
}
