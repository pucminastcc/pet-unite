import {ApiProperty} from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({default: 'petunite@hotmail.com', required: true})
    readonly email: string;
    @ApiProperty({default: 'PetUnite', required: true})
    readonly username: string;
    @ApiProperty({default: '#@Senha!123', required: true})
    password: string;
    terms: boolean;
    activated: boolean;
    provider: string;
    img: string;
}
