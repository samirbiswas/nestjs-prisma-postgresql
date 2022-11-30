import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

import {
  // Controller,
  // Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
// import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';


@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService) { }

  @Post('signup')
  async signupUser(
    @Body() userData: { name: string; email: string, password: string }):
    Promise<UserModel> {

    try {
      return this.userService.createUser(userData)

    } catch (error) {
      throw new HttpException('Internals server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  @Post('login')
  async loginUser(
    @Body() userData: {email: string, password: string }):
    Promise<UserModel> {

    try {
      // let data = userData
      
      return this.userService.login(userData)

    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }



}
