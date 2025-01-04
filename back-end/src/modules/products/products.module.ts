import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { DbModule } from '../../db/db.module';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [DbModule],
  controllers: [ProductsController],
  providers: [ProductsRepository],
})
export class ProductsModule { }
