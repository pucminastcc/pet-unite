import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {User} from '../../../domain/auth/models/user.model';

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService
    ) {
    }

    async sendUserConfirmation(user: User, token: string): Promise<void> {
        const url = `${process.env.API_URL}/auth/confirm?token=${token}`;

        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Bem-vindo ao Aplicativo! Confirme seu email',
                html: `<p>Olá ${user.username},</p>
                   <p>Clique abaixo para confirmar seu e-mail</p>
                   <p><a href="${url}">Confirmar</a></p>
                   <p>Se você não solicitou este e-mail, pode ignorá-lo com segurança.</p>`
            });
        } catch (err) {
            throw err;
        }
    }

    async sendPasswordResetCode(email: string, code: string): Promise<void> {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Solicitação de alteração de senha! Expira em 15 minutos',
                html: `Seu código de verificação é <b>${code}</b>`,
            });
        } catch (err) {
            throw err;
        }
    }
}
