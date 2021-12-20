import {ApiProperty} from '@nestjs/swagger';

export class SendPasswordResetCodeDto {
    @ApiProperty()
    email: string;
}
