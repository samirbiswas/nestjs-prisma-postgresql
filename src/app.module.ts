import { Module } from '@nestjs/common';
import { UserController } from './auth/user.controller';
// import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './auth/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService,UserService],
})
export class AppModule { }
