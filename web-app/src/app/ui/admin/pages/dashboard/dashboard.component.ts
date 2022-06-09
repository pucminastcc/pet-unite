import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {finalize} from 'rxjs/operators';
import {DonationChartResult} from '../../../../domain/auth/models/results/donation-chart.result';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {Subscription} from 'rxjs';
import {ContributionChartResult} from '../../../../domain/auth/models/results/contribution-chart.result';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private getDonationChartSubscription: Subscription;
  private getContributionChartSubscription: Subscription;

  public currentYear: number = new Date().getFullYear();
  private labels: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  private donationsData: number[] = [];
  private adoptionsData: number[] = [];
  private contributionsData: number[] = [];

  public donationsChartData: any;
  public contributionsChartData: any;
  public basicOptions: any = {
    scales: {
      y: {
        beginAtZero:true,
        ticks: {
          precision: 0,
        },
      },
    }
  };

  public isLoadingDonationsData: boolean = false;
  public isLoadingContributionsData: boolean = false;

  constructor(
      private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.getDonationsChartData();
    this.getContributionsChartData();
  }

  private getDonationsChartData(): void {
    this.isLoadingDonationsData  = true;
    this.getDonationChartSubscription = this.authService.getDonationChart()
        .pipe(
            finalize(() => {
              this.isLoadingDonationsData = false;
            })
        )
        .subscribe((result: DonationChartResult) => {
          if (result) {
            this.labels.forEach((label: string) => {
              const donation = result.donations.find((donation: {count: number, month: string}) => donation.month === label);
              this.donationsData.push(donation ? donation.count : 0);

              const adoption = result.adoptions.find((adoption: {count: number, month: string}) => adoption.month === label);
              this.adoptionsData.push(adoption ? adoption.count : 0);
            });

            this.updateDonationsChartData();
          }
        }, (error) => {
          if (error.status === 401) {
            this.logout();
          }
        });
  }

  private getContributionsChartData(): void {
    this.isLoadingContributionsData = true;
    this.getContributionChartSubscription = this.authService.getContributionChart()
        .pipe(
            finalize(() => {
              this.isLoadingContributionsData = false;
            })
        )
        .subscribe((result: ContributionChartResult) => {
          if (result) {
            console.log(result);
            this.labels.forEach((label: string) => {
              const contribution = result.contributions.find((contribution: {count: number, month: string}) => contribution.month === label);
              this.contributionsData.push(contribution ? contribution.count : 0);
            });

            this.updateContributionsChartData();
          }
        }, (error) => {
          if (error.status === 401) {
            this.logout();
          }
        });
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe(): void {
    if (this.getDonationChartSubscription)
      this.getDonationChartSubscription.unsubscribe();

    if (this.getContributionChartSubscription)
      this.getContributionChartSubscription.unsubscribe();
  }

  private logout(): void {
    this.authService.logout()
        .subscribe((data: LogoutResult) => {
          if (data) {
            if (data.success) {
              window.location.href = '/';
            }
          }
        });
  }

  private updateDonationsChartData(): void {
    this.donationsChartData = {
      labels: this.labels,
      datasets: [
        {
          label: 'Doações',
          data: this.donationsData,
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'Adoções',
          data: this.adoptionsData,
          fill: false,
          borderColor: '#FFA726',
          tension: .4
        }
      ]
    };
  }

  private updateContributionsChartData(): void {
    this.contributionsChartData = {
      labels: this.labels,
      datasets: [
        {
          label: 'Contribuições',
          data: this.contributionsData,
          fill: true,
          borderColor: '#42A5F5',
          tension: .4
        }
      ]
    };
  }
}
