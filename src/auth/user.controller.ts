import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';


@ApiTags("Test module")
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService) { }

  // signup controller
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: 'string',
          example: "samir",
          description: "Not unique"
        },
        email: {
          type: 'string',
          example: "samir@gmail.com",
          description: "Should be unique"
        },
        password: {
          type: 'string',
          example: "12345678",
          description: "Your wish"
        },
        role: {
          type: 'enum',
          example: "SUPERADMIN",
          description: "By default 'USER'"
        }
      },

    }
  })
  @ApiResponse({ status: 201, description: 'The record has been successfully created' })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
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


  // login controller
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: {
          type: 'string',
          example: "samir@gmail.com",
          description: "You must be register user"
        },
        password: {
          type: 'string',
          example: "12345678",
          description: "Your password"
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Login successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credential' })
  @ApiResponse({ status: 500, description: 'Server Error.' })

  @Post('login')
  async loginUser(
    @Body() userData: { email: string, password: string }):
    Promise<UserModel> {
    try {
      return this.userService.login(userData)

    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

}
