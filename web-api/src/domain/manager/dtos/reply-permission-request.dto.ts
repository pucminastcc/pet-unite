import {ApiProperty} from '@nestjs/swagger';

export class ReplyPermissionRequestDto {
    @ApiProperty({default: '6295706935f4d4183511602e', description: 'Informar o ID da solicitação', required: true})
    id: string;
    @ApiProperty({default: true, description: 'Informar a confirmação da solicitação', required: true})
    confirm: string;
}
