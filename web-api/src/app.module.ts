import {Module} from '@nestjs/common';
import {CoreModule} from 'libs/core';
import {InfraModule} from './infra/infra.module';
import {DomainModule} from './domain/domain.module';
import {ApiModule} from './api/api.module';
import {SharedModule} from './shared/shared.module';

@Module({
    imports: [
        CoreModule,
        ApiModule,
        DomainModule,
        InfraModule,
        SharedModule
    ],
    providers: [],
})
export class AppModule {
}
