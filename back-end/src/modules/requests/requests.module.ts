import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { DbModule } from '../../db/db.module';
import { RequestsRepository } from './requests.repository';

@Module({
    imports: [DbModule],
    controllers: [RequestsController],
    providers: [RequestsRepository],
})
export class RequestsModule { }
