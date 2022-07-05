import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbOptions } from './config/database';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot(dbOptions), TypeOrmModule.forFeature([User])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
