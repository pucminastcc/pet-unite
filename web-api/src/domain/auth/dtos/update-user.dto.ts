import {Types} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateUserDto {
    id: Types.ObjectId;
    img: string;
    username: string;
    personTypeId: string;
    @ApiProperty({default: '000.000.000-00', required: true})
    document: string;
    @ApiProperty({default: '15.700-124', required: true})
    zipCode: string;
    @ApiProperty({default: 'Rua 16', required: true})
    address: string;
    @ApiProperty({default: 'Centro', required: true})
    district: string;
    @ApiProperty({default: '6208175ab016a03e00c60da0', required: true})
    cityId: Types.ObjectId;
    @ApiProperty({default: 'SP', required: true})
    state: string;
    @ApiProperty({default: 'de 2600/2601 a 3069/3070', required: true})
    complement: string;
    @ApiProperty({default: '(17)3632-3632'})
    phone: string;
    @ApiProperty({default: '(17)99799-9999'})
    cell: string;
    @ApiProperty({default: '(17)99799-9999'})
    whatsapp: string;
}
