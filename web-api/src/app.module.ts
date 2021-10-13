import {Module} from '@nestjs/common';
import {CoreModule} from 'libs/core';
import {ApiModule} from './api/api.module';
import { DomainModule } from './domain/domain.module';

@Module({
    imports: [
        CoreModule,
        ApiModule,
        DomainModule,
    ],
    providers: [],
})
export class AppModule {
}
