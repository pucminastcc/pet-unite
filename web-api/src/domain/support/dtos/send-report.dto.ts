import {ApiProperty} from '@nestjs/swagger';

export class SendReportDto {
    username: string;
    email: string;
    userId: string;
    date: string;
    @ApiProperty({default: 'Lorem Ipsum', description: 'Informar o assunto', required: true})
    subject: string;
    @ApiProperty({default: '620317f8a7c6a4b23b8986d3', description: 'Informar o ID do tipo de relatório', required: true})
    reportTypeId: string;
    @ApiProperty({default: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book', description: 'Informar a descrição', required: true})
    description: string;
}
