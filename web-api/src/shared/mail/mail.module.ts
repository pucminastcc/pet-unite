import {Module} from '@nestjs/common';
import {MailService} from './services/mail.service';
import {MailerModule} from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {join} from 'path';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                tls: {
                    rejectUnauthorized: false
                }
            },
            defaults: {
                from: `"Pet Unite" <${process.env.SMTP_USER}>`,
            },
            template: {
                dir: join(__dirname, 'shared/mail/templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {
}
