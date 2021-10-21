import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {
    }

    async sendUserConfirmation(email: string, username: string, token: string): Promise<void> {
        const url = `example.com/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Bem-vindo ao Aplicativo! Confirme seu email',
            template: './confirmation',
            context: {
                name: username,
                url,
            },
        });
    }

    async sendPasswordResetCode(email: string, code: string): Promise<void> {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Solicitação de alteração de senha!',
            text: `${code}`,
        });
    }
}
