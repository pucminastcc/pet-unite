import {ApiProperty} from '@nestjs/swagger';

export class ValidateLocalUserDto {
    @ApiProperty({default: 'petunite@exemplo.com', required: true})
    email: string;
    @ApiProperty({default: '12345678', required: true})
    password: string;
}
