import {PasswordResetCodeModel} from '../password-reset-code.model';

export interface ValidatePasswordResetCodeResult {
  success: boolean;
  message: string;
  passwordResetCode: PasswordResetCodeModel;
}
