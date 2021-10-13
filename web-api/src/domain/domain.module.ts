import { Module } from '@nestjs/common';
import {InfraModule} from '../infra/infra.module';
import {LoginCommand} from './auth/commands/login.command';

@Module({
    imports: [InfraModule],
    exports: [LoginCommand],
    providers: [LoginCommand],
})
export class DomainModule {
}
