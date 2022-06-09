import {Types} from 'mongoose';

export class GetContributionChartDto {
    userId: Types.ObjectId;
    currentYear: number;
}
