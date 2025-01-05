import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { RequestsModule } from './modules/requests/requests.module';

@Module({
  imports: [ProductsModule, RequestsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
