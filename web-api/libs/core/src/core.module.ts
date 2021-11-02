import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {configuration} from 'libs/core/lib/config/configuration';
import {validationSchema} from 'libs/core/lib/config/validation';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, load: [configuration], validationSchema
        }),
    ],
    providers: [],
    exports: [],
})
export class CoreModule {
}
