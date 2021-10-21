import {Global, Module} from '@nestjs/common';
import {MailModule} from './mail/mail.module';

@Global()
@Module({
    imports: [MailModule],
    exports: [MailModule]
})
export class SharedModule {
}
