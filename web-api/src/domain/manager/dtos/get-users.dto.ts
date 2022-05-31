import {Types} from 'mongoose';

export class GetUsersDto {
    id: Types.ObjectId;
    isInstitution: boolean;
    state?: string;
}
