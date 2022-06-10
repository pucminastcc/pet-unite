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

  private donationData: number[] = [];
  private adoptionData: number[] = [];
  private contributionData: number[] = [];

  public donationChartData: any;
  public contributionChartData: any;
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

  public isLoadingDonationData: boolean = false;
  public isLoadingContributionData: boolean = false;

  constructor(
      private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.getDonationChart();
    this.getContributionChart();
  }

  private getDonationChart(): void {
    this.isLoadingDonationData  = true;
    this.getDonationChartSubscription = this.authService.getDonationChart()
        .pipe(
            finalize(() => {
              this.isLoadingDonationData = false;
            })
        )
        .subscribe((result: DonationChartResult) => {
          if (result) {
            this.labels.forEach((label: string) => {
              const donation = result.donations.find((donation: {count: number, month: string}) => donation.month === label);
              this.donationData.push(donation ? donation.count : 0);

              const adoption = result.adoptions.find((adoption: {count: number, month: string}) => adoption.month === label);
              this.adoptionData.push(adoption ? adoption.count : 0);
            });

            this.updateDonationChartData();
          }
        }, (error) => {
          if (error.status === 401) {
            this.logout();
          }
        });
  }

  private getContributionChart(): void {
    this.isLoadingContributionData = true;
    this.getContributionChartSubscription = this.authService.getContributionChart()
        .pipe(
            finalize(() => {
              this.isLoadingContributionData = false;
            })
        )
        .subscribe((result: ContributionChartResult) => {
          if (result) {
            this.labels.forEach((label: string) => {
              const contribution = result.contributions.find((contribution: {count: number, month: string}) => contribution.month === label);
              this.contributionData.push(contribution ? contribution.count : 0);
            });

            this.updateContributionChartData();
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

  private updateDonationChartData(): void {
    this.donationChartData = {
      labels: this.labels,
      datasets: [
        {
          label: 'Doações',
          data: this.donationData,
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'Adoções',
          data: this.adoptionData,
          fill: false,
          borderColor: '#FFA726',
          tension: .4
        }
      ]
    };
  }

  private updateContributionChartData(): void {
    this.contributionChartData = {
      labels: this.labels,
      datasets: [
        {
          label: 'Contribuições',
          data: this.contributionData,
          fill: true,
          borderColor: '#42A5F5',
          tension: .4
        }
      ]
    };
  }
}
