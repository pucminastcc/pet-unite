import {Types} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateUserDto {
    id: Types.ObjectId;
    img: string;
    @ApiProperty({default: 'sistema', required: true})
    username: string;
    @ApiProperty({default: '61e490aafe62c3e403c9c4ab', required: true})
    personTypeId: string;
    @ApiProperty({default: '974.202.530-48', required: true})
    document: string;
    @ApiProperty({default: '15.700-124', required: true})
    zipCode: string;
    @ApiProperty({default: 'Rua 16', required: true})
    address: string;
    @ApiProperty({default: 'Centro', required: true})
    district: string;
    @ApiProperty({default: 'Jales', required: true})
    city: string;
    @ApiProperty({default: 'SP', required: true})
    state: string;
    @ApiProperty({default: 'Casa', required: true})
    complement: string;
    @ApiProperty({default: ''})
    phone: string;
    @ApiProperty({default: ''})
    cell: string;
    @ApiProperty({default: ''})
    whatsapp: string;
}
