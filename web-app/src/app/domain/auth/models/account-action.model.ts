import {AccountActionEnum} from '../enums/account-action.enum';

export interface AccountActionModel {
  action: AccountActionEnum;
  dialogHeader: string;
}
