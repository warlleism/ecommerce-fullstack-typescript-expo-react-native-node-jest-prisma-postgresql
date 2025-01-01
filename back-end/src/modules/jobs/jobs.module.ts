import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { DbModule } from 'src/db/db.module';
import { JobsRepository } from './jobs.repository';

@Module({
  imports: [DbModule],
  controllers: [JobsController],
  providers: [JobsRepository],
})
export class JobsModule { }
