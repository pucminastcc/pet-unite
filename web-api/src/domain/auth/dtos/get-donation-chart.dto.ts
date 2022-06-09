import {Types} from 'mongoose';

export class GetDonationChartDto {
    userId: Types.ObjectId;
    currentYear: number;
}
