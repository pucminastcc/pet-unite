import {ApiProperty} from '@nestjs/swagger';
import {Types} from 'mongoose';

export class UpdatePetDto {
    userId: Types.ObjectId;
    @ApiProperty({default: '624a5b165d7b9a3f6a3c5641', description: 'Informar o ID do pet', required: true})
    id: string;
    @ApiProperty({default: 'data:image/jpeg;base64,...', description: 'Informar a imagem', required: true})
    img: string ;
    @ApiProperty({default: 'Maya', description: 'Informar o nome', required: true})
    name: string;
    @ApiProperty({default: '61f57becba146329a791e7b2', description: 'Informar o ID do gênero', required: true})
    petGenderId: string;
    @ApiProperty({default: '628ed0c40d3111c83259ce66', description: 'Informar o ID do tipo', required: true})
    petTypeId: string;
    @ApiProperty({default: 'Pitbull', description: 'Informar a raça', required: true})
    breed: string;
    @ApiProperty({default: '<p>Muito brincalhona, adora passear e gosta muito de frutas.</p>', description: 'Informar a descrição', required: true})
    description: string;
    @ApiProperty({default: 4, description: 'Informar a taxa de gostar de crianças', required: true})
    rateLikesChild: number;
    @ApiProperty({default: 5, description: 'Informar a taxa de gostar de passeios', required: true})
    rateLikesTours: number;
    @ApiProperty({default: 3, description: 'Informar a taxa de amigável', required: true})
    rateFriendly: number;
    @ApiProperty({default: 3, description: 'Informar a taxa de treinamento', required: true})
    rateTraining: number;
    @ApiProperty({default: '2 anos', description: 'Informar a idade', required: true})
    age: string;
}
