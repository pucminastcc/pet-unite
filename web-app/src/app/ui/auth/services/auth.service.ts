import {Injectable} from '@angular/core';
import {IAuthRepository} from '../../../domain/auth/repositories/iauth.repository';
import {LoginInput} from '../../../domain/auth/commands/inputs/login.input';
import {Observable} from 'rxjs';
import {LoginResult} from '../../../domain/auth/models/results/login.result';
import {LoginCommand} from '../../../domain/auth/commands/login.command';
import {RegisterInput} from '../../../domain/auth/commands/inputs/register.input';
import {RegisterResult} from '../../../domain/auth/models/results/register.result';
import {RegisterCommand} from '../../../domain/auth/commands/register.command';
import {SendPasswordResetCodeInput} from '../../../domain/auth/commands/inputs/send-password-reset-code';
import {SendPasswordResetCodeResult} from '../../../domain/auth/models/results/send-password-reset-code.result';
import {ValidatePasswordResetCodeInput} from '../../../domain/auth/commands/inputs/validate-password-reset-code.input';
import {ValidatePasswordResetCodeResult} from '../../../domain/auth/models/results/validate-password-reset-code.result';
import {ValidatePasswordResetCodeCommand} from '../../../domain/auth/commands/validate-password-reset-code.command';
import {SendPasswordResetCodeCommand} from '../../../domain/auth/commands/send-password-reset-code.command';
import {ChangePasswordInput} from '../../../domain/auth/commands/inputs/change-password.input';
import {ChangePasswordResult} from '../../../domain/auth/models/results/change-password.result';
import {ChangePasswordCommand} from '../../../domain/auth/commands/change-password.command';
import {LogoutCommand} from '../../../domain/auth/commands/logout.command';
import {LogoutInput} from '../../../domain/auth/commands/inputs/logout.input';
import {LogoutResult} from '../../../domain/auth/models/results/logout.result';
import {GetAuthenticatedUserInput} from 'src/app/domain/auth/commands/inputs/get-authenticated-user.input';
import {GetAuthenticatedUserCommand} from '../../../domain/auth/commands/get-authenticated-user.command';
import {AuthenticatedUserModel} from '../../../domain/auth/models/authenticated-user.model';
import {ConfirmEmailCommand} from '../../../domain/auth/commands/confirm-email.command';
import {ConfirmEmailInput} from '../../../domain/auth/commands/inputs/confirm-email.input';
import {ConfirmEmailResult} from '../../../domain/auth/models/results/confirm-email.result';
import {GetTokenInput} from 'src/app/domain/auth/commands/inputs/get-token.input';
import {GetTokenCommand} from '../../../domain/auth/commands/get-token.command';
import {UpdateUserResult} from '../../../domain/auth/models/results/update-user.result';
import {UpdateUserInput} from '../../../domain/auth/commands/inputs/update-user.input';
import {UpdateUserCommand} from '../../../domain/auth/commands/update-user.command';
import {GetUserCommand} from '../../../domain/auth/commands/get-user.command';
import {GetUserInput} from 'src/app/domain/auth/commands/inputs/get-user.input';
import {GetUserResult} from 'src/app/domain/auth/models/results/get-user.result';
import {LoginFacebookInput} from '../../../domain/auth/commands/inputs/login-facebook.input';
import {LoginFacebookCommand} from '../../../domain/auth/commands/login-facebook.command';
import {LoginGoogleInput} from '../../../domain/auth/commands/inputs/login-google.input';
import {LoginGoogleCommand} from '../../../domain/auth/commands/login-google.command';
import {GetDonationChartInput} from '../../../domain/auth/commands/inputs/get-donation-chart.input';
import {DonationChartResult} from '../../../domain/auth/models/results/donation-chart.result';
import {GetDonationChartCommand} from '../../../domain/auth/commands/get-donation-chart.command';
import {GetContributionChartCommand} from '../../../domain/auth/commands/get-contribution-chart.command';
import { GetContributionChartInput } from 'src/app/domain/auth/commands/inputs/get-contribution-chart.input';
import { ContributionChartResult } from 'src/app/domain/auth/models/results/contribution-chart.result';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthRepository {

  private readonly accessToken: string;

  constructor(
    private readonly loginCommand: LoginCommand,
    private readonly loginFacebookCommand: LoginFacebookCommand,
    private readonly loginGoogleCommand: LoginGoogleCommand,
    private readonly registerCommand: RegisterCommand,
    private readonly sendPasswordResetCommand: SendPasswordResetCodeCommand,
    private readonly validatePasswordRecoveryCommand: ValidatePasswordResetCodeCommand,
    private readonly changePasswordCommand: ChangePasswordCommand,
    private readonly logoutCommand: LogoutCommand,
    private readonly getAuthenticatedUserCommand: GetAuthenticatedUserCommand,
    private readonly confirmEmailCommand: ConfirmEmailCommand,
    private readonly getTokenCommand: GetTokenCommand,
    private readonly getUserCommand: GetUserCommand,
    private readonly updateUserCommand: UpdateUserCommand,
    private readonly getDonationChartCommand: GetDonationChartCommand,
    private readonly getContributionChartCommand: GetContributionChartCommand,
  ) {
    this.accessToken = this.getToken();
  }

  login(input: LoginInput): Observable<LoginResult> {
    return this.loginCommand.execute(input);
  }

  loginFacebok(input: LoginFacebookInput): Observable<LoginResult> {
    return this.loginFacebookCommand.execute(input);
  }

  loginGoogle(input: LoginGoogleInput): Observable<LoginResult> {
    return this.loginGoogleCommand.execute(input);
  }

  register(input: RegisterInput): Observable<RegisterResult> {
    return this.registerCommand.execute(input);
  }

  sendPasswordResetCode(input: SendPasswordResetCodeInput): Observable<SendPasswordResetCodeResult> {
    return this.sendPasswordResetCommand.execute(input);
  }

  validatePasswordResetCode(input: ValidatePasswordResetCodeInput): Observable<ValidatePasswordResetCodeResult> {
    return this.validatePasswordRecoveryCommand.execute(input);
  }

  changePassword(input: ChangePasswordInput): Observable<ChangePasswordResult> {
    return this.changePasswordCommand.execute(input);
  }

  logout(input?: LogoutInput): Observable<LogoutResult> {
    return this.logoutCommand.execute(input);
  }

  getAuthenticatedUser(input?: GetAuthenticatedUserInput): Observable<AuthenticatedUserModel> {
    return this.getAuthenticatedUserCommand.execute(input);
  }

  confirmEmail(input: ConfirmEmailInput): Observable<ConfirmEmailResult> {
    return this.confirmEmailCommand.execute(input);
  }

  getToken(input?: GetTokenInput): string {
    return this.getTokenCommand.execute(input);
  }

  getUser(input?: GetUserInput): Observable<GetUserResult> {
    return this.getUserCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  updateUser(input: UpdateUserInput): Observable<UpdateUserResult> {
    return this.updateUserCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getDonationChart(input?: GetDonationChartInput): Observable<DonationChartResult> {
    return this.getDonationChartCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getContributionChart(input?: GetContributionChartInput): Observable<ContributionChartResult> {
    return this.getContributionChartCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }
}
