import {ApiProperty} from '@nestjs/swagger';

export class UpdateUserDto {
    id: string;
    img: string;
    username: string;
    personTypeId: string;
    @ApiProperty({default: '390.319.950-88', description: 'Informar o documento', required: true})
    document: string;
    @ApiProperty({default: '15700-128', description: 'Informar o cep', required: true})
    zipCode: string;
    @ApiProperty({default: 'Avenida João Amadeu', description: 'Informar o logradouro', required: true})
    address: string;
    @ApiProperty({default: 'Centro', description: 'Informar o bairro', required: true})
    district: string;
    @ApiProperty({default: '6208175ab016a03e00c60da0', description: 'Informar o ID da cidade', required: true})
    cityId: string;
    @ApiProperty({default: 'SP', description: 'Informar o UF', required: true})
    state: string;
    @ApiProperty({default: 'de 2801 a 3099 - lado ímpar', description: 'Informar o complemento', required: true})
    complement: string;
    @ApiProperty({default: '(17)3632-3632', description: 'Informar o número de telefone'})
    phone: string;
    @ApiProperty({default: '(17)99799-9999', description: 'Informar o número de celular'})
    cell: string;
    @ApiProperty({default: '(17)99799-9999', description: 'Informar o número de whatsapp'})
    whatsapp: string;
    @ApiProperty({default: false, description: 'Informar se tem os direitos de uma Instituição'})
    permissionRequest: boolean;
}
