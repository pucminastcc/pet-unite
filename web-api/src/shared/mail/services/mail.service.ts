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

    async sendSignalDonation(email: string, username: string, petName: string, donateToInstitution: boolean = false): Promise<void> {
        try {
            let subject: string;
            let message: string;

            if (donateToInstitution) {
                subject = `Que legal! Uma doação foi postada`;
                message = `O usuário ${username} está doando ${petName}. <br/> Não deixe seu amigo esperando entre na aplicação e veja as formas de contato disponíveis! <br/>Clique aqui: <a href="${process.env.APP_URL}">Pet Unite</a>`;
            } else {
                subject = `Que legal! A doação de ${petName} foi sinalizada!`;
                message =  `O usuário ${username} sinalizou interesse em adotar ${petName}. <br/> Não deixe seu amigo esperando entre na aplicação e veja as formas de contato disponíveis! <br/>Clique aqui: <a href="${process.env.APP_URL}">Pet Unite</a>`;
            }

            await this.mailerService.sendMail({
                to: email,
                subject: subject,
                html: message,
            });
        } catch (err) {
        }
    }

    async sendDonationStatus(email: string, username: string, petName: string): Promise<void> {
        try {
            let subject: string;
            let message: string;

            await this.mailerService.sendMail({
                to: email,
                subject: `O status da doação de ${petName} foi alterado por ${username}`,
                html: `Para saber mais, visite nossa aplicação! <br/>Clique aqui: <a href="${process.env.APP_URL}">Pet Unite</a>`,
            });
        } catch (err) {
        }
    }
}
