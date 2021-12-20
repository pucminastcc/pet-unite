import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ConfirmEmailResult} from '../../../../domain/auth/models/results/confirm-email.result';
import {EmailConfirmationModel} from '../../../../domain/auth/models/email-confirmation.model';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  private params: EmailConfirmationModel | undefined;
  public result: ConfirmEmailResult | undefined;
  public isLoading: boolean = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {
    this.route.params.subscribe((data: Params) => {
      if (data) {
        this.params = {
          token: data.token,
          key: data.key
        };
      }
    });
  }

  ngOnInit(): void {
    if (this.params) {
      const {token, key} = this.params;
      this.authService.confirmEmail({
        token,
        key
      }).subscribe((data: ConfirmEmailResult) => {
        if (data) {
          if(data.success) {
            this.result = data;
            this.isLoading = false;
          } else {
            window.location.href = '/';
          }
        }
      });
    }
  }
}
