import {Global, Module} from '@nestjs/common';
import {MailModule} from './mail/mail.module';
import {UtilModule} from './util/util.module';

@Global()
@Module({
    imports: [
        MailModule,
        UtilModule
    ],
    exports: [
        MailModule,
        UtilModule
    ]
})
export class SharedModule {
}
