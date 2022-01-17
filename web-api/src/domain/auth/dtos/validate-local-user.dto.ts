import {ApiProperty} from '@nestjs/swagger';

export class ValidateLocalUserDto {
    @ApiProperty({default: 'sistema@exemplo.com', required: true})
    email: string;
    @ApiProperty({default: '#@Senha!123', required: true})
    password: string;
}
