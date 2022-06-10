import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {GetContributionChartInput} from './inputs/get-contribution-chart.input';
import {ContributionChartResult} from '../models/results/contribution-chart.result';
import {ManagerRepository} from '../../../data/manager/repositories/manager.repository';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetContributionChartCommand implements Command<GetContributionChartInput, ContributionChartResult> {
  constructor(
    private readonly repos: ManagerRepository
  ) {
  }

  execute(params: GetContributionChartInput): Observable<ContributionChartResult> {
    return this.repos.getContributionChart(params);
  }
}
