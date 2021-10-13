import {Component, OnInit} from '@angular/core';
import {AccountActionEnum} from '../../../../domain/auth/enums/account-action.enum';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AccountActionModel} from '../../../../domain/auth/models/account-action.model';

@Component({
  selector: 'app-account-action',
  templateUrl: './account-action.component.html',
  styleUrls: ['./account-action.component.scss']
})
export class AccountActionComponent implements OnInit {
  public accountActionEnum = AccountActionEnum;
  public accountAction: AccountActionEnum | undefined;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.accountAction = AccountActionEnum.Login;
    this.config.header = 'Login';
  }

  ngOnInit(): void {
  }

  public getAccountAction(accountModel: AccountActionModel): void {
    this.accountAction = accountModel.action;
    this.config.header = accountModel.dialogHeader;
  }
}
