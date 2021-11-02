import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EmailConfirmationModel} from '../../../../domain/auth/models/email-confirmation.model';
import {AuthService} from '../../services/auth.service';
import {ConfirmEmailResult} from '../../../../domain/auth/models/results/confirm-email.result';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  private emailConfirmation: EmailConfirmationModel | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {
    this.route.params.subscribe((data: Params) => {
      if (data) {
        this.emailConfirmation = {
          token: data.token,
          key: data.key
        };
      }
    });
  }

  ngOnInit(): void {
    if(this.emailConfirmation) {
      const {token, key} = this.emailConfirmation;
      this.authService.confirmEmail({
        token,
        key
      }).subscribe((data: ConfirmEmailResult) => {
        if (data) {
        }
      });
    }
  }
}
