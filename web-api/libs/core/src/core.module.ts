import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {configuration} from 'libs/core/lib/config/configuration';
import {validationSchema} from 'libs/core/lib/config/validation';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, load: [configuration], validationSchema
        }),
        MongooseModule.forRoot(process.env.DB_CONN, {
                useNewUrlParser: true, useUnifiedTopology: true
            }
        )
    ],
    providers: [],
    exports: [],
})
export class CoreModule {
}
