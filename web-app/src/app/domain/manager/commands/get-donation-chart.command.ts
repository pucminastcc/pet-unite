import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {DonationChartResult} from '../../auth/models/results/donation-chart.result';
import {ManagerRepository} from '../../../data/manager/repositories/manager.repository';
import {Observable} from 'rxjs';
import {GetDonationChartInput} from './inputs/get-donation-chart.input';

@Injectable({
  providedIn: 'root'
})
export class GetDonationChartCommand implements Command<GetDonationChartInput, DonationChartResult> {
  constructor(
    private readonly repos: ManagerRepository
  ) {
  }

  execute(params: GetDonationChartInput): Observable<DonationChartResult> {
    return this.repos.getDonationChart(params);
  }
}
