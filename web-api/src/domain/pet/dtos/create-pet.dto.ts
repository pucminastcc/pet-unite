import {ApiProperty} from '@nestjs/swagger';
import {Types} from 'mongoose';

export class CreatePetDto {
    userId: Types.ObjectId;
    @ApiProperty({default: 'data:image/png;base64,...', description: 'Informar a imagem', required: true})
    img: string ;
    @ApiProperty({default: 'Bob', description: 'Informar o nome', required: true})
    name: string;
    @ApiProperty({default: '61f57bd1ba146329a791e7b1', description: 'Informar o ID do gênero', required: true})
    petGenderId: string;
    @ApiProperty({default: '628ed0c40d3111c83259ce66', description: 'Informar o ID do tipo', required: true})
    petTypeId: string;
    @ApiProperty({default: 'Labrador', description: 'Informar a raça', required: true})
    breed: string;
    @ApiProperty({default: '<p>Gosta de maçãs e muito brincalhão.</p>', description: 'Informar a descrição', required: true})
    description: string;
    @ApiProperty({default: 5, description: 'Informar a taxa de gostar de crianças', required: true})
    rateLikesChild: number;
    @ApiProperty({default: 4, description: 'Informar a taxa de gostar de passeios', required: true})
    rateLikesTours: number;
    @ApiProperty({default: 5, description: 'Informar a taxa de amigável', required: true})
    rateFriendly: number;
    @ApiProperty({default: 3, description: 'Informar a taxa de treinamento', required: true})
    rateTraining: number;
    @ApiProperty({default: '3 meses', description: 'Informar a idade', required: true})
    age: string;
}
