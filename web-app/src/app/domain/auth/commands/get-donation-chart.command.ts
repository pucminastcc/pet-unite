import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {GetDonationChartInput} from './inputs/get-donation-chart.input';
import {DonationChartResult} from '../models/results/donation-chart.result';
import {Observable} from 'rxjs';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';

@Injectable({
  providedIn: 'root'
})
export class GetDonationChartCommand implements Command<GetDonationChartInput, DonationChartResult> {

  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params: GetDonationChartInput): Observable<DonationChartResult> {
    return this.repos.getDonationChart(params);
  }
}
