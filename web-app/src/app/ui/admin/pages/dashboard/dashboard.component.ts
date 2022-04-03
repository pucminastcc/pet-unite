import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public basicData: any;
  public basicData2: any;
  public basicOptions: any;

  constructor() {
  }

  ngOnInit(): void {
    this.basicData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
      datasets: [
        {
          label: 'Doações',
          data: [3, 0, 2, 1, 0, 0, 2],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'Adoções',
          data: [4, 2, 0, 3, 1, 1, 0],
          fill: false,
          borderColor: '#FFA726',
          tension: .4
        }
      ]
    };

    this.basicData2 = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
      datasets: [
        {
          label: 'Contribuições',
          data: [7, 2, 2, 4, 1, 1, 2],
          fill: true,
          borderColor: '#42A5F5',
          tension: .4
        }
      ]
    };
  }
}
