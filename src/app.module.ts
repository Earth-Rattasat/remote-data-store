import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbOptions } from './config/database';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbOptions),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
