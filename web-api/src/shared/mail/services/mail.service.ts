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

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Bem-vindo ao Aplicativo! Confirme seu email',
            template: './confirmation',
            context: {
                name: user.username,
                url,
            },
        });
    }

    async sendPasswordResetCode(email: string, code: string): Promise<void> {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Solicitação de alteração de senha! Expira em 15 minutos',
            html: `Seu código de verificação é <b>${code}</b>`,
        });
    }
}
