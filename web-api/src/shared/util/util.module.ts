import {Module} from '@nestjs/common';
import {UtilService} from './services/util.service';

@Module({
    providers: [UtilService],
    exports: [UtilService]
})
export class UtilModule {
}
