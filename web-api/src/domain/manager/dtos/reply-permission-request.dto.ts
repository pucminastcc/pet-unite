import {ApiProperty} from '@nestjs/swagger';

export class ReplyPermissionRequestDto {
    @ApiProperty({default: '629658ddd498aab6a6099c9a', description: 'Informar o ID da solicitação', required: true})
    id: string;
    @ApiProperty({default: true, description: 'Informar a confirmação da solicitação', required: true})
    confirm: boolean;
}
