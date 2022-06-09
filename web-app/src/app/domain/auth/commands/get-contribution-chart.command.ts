import {Command} from '../../../core/base/command';
import {GetContributionChartInput} from './inputs/get-contribution-chart.input';
import {ContributionChartResult} from '../models/results/contribution-chart.result';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetContributionChartCommand implements Command<GetContributionChartInput, ContributionChartResult> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params: GetContributionChartInput): Observable<ContributionChartResult> {
    return this.repos.getContributionChart(params);
  }
}
