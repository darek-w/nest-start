import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.model';

@Module({
  imports: [
    ProductsModule, 
    MongooseModule.forRoot(
      'mongodb+srv://alpha:QWNwn0voTm5pxKNM@cluster0.lmlxr.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
