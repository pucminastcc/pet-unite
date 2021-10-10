import {Module} from '@nestjs/common';
import {CoreModule} from 'libs/core';
import {DomainModule} from './domain/domain.module';
import {InfraModule} from './infra/infra.module';
import {SharedModule} from './shared/shared.module';
import {ApiModule} from './api/api.module';

@Module({
    imports: [
        CoreModule,
        ApiModule,
        DomainModule,
        InfraModule,
        SharedModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
