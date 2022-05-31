import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgwWowService} from 'ngx-wow';
import {HomeInfoSessionModel} from '../../../../domain/index/models/home-info-session.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public responsiveOptions: any[];
  public infoSession: HomeInfoSessionModel[] = [];

  constructor(
    private wowService: NgwWowService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.infoSession = this.getHomeInfoSession();
  }

  private getHomeInfoSession(): HomeInfoSessionModel[] {
    return [
      {
        title: 'Comunidade',
        description: 'Nossa comunidade foi feita pensando em você que quer ajudar os animais a encontrar um lar. E assim poder fazer nosso mundo melhor.',
        icon: 'fas fa-users'
      },
      {
        title: 'Animal de Estimação',
        description: 'Animais tem o dom de transmitir bem-estar por serem carinhosos e cuidar de sua família por meio de uma forma pura e sincera.',
        icon: 'fas fa-paw'
      },
      {
        title: 'Adoção',
        description: 'Estudos mostram como adotar um animalzinho faz bem a saúde do ser humano. Além de ser uma companhia, evita doenças como ansiedade, depressão e estresses diários.',
        icon: 'fas fa-hand-holding-heart'
      },
      {
        title: 'Feedback',
        description: 'Temos canais de comunicação que fornecem suporte a comunidade para melhoria de nossos serviços de adoção e doação.',
        icon: 'fas fa-comments'
      }
    ];
  }

  ngAfterViewInit(): void {
    this.wowService.init();
  }
}
