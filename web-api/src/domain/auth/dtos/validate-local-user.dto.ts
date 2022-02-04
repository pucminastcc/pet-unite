import {ApiProperty} from '@nestjs/swagger';

export class ValidateLocalUserDto {
    @ApiProperty({default: 'petunite@hotmail.com', required: true})
    email: string;
    @ApiProperty({default: '#@Senha!123', required: true})
    password: string;
}
