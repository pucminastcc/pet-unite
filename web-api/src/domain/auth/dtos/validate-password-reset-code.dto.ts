import {ApiProperty} from '@nestjs/swagger';

export class ValidatePasswordResetCodeDto {
    @ApiProperty()
    code: string;
    @ApiProperty()
    email: string;
}
