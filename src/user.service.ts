import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        let foundUser = await this.prisma.user.findFirst({
            where: {
                email:data.email
            }
        })

        if (foundUser) {
            throw new HttpException('User already exsits', HttpStatus.BAD_REQUEST);
        }

        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        return this.prisma.user.create({
            data
        })

    }

    // User login api

    async login(data: { email?: string; password: any; }): Promise<any> {
        let find_user = await this.prisma.user.findFirst({
            where: {
                email:data.email
            }
        })

        if (!find_user) {
            throw new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);
        }

        const doMatch = await bcrypt.compare(data.password, find_user.password);

        if (!doMatch) {
            throw new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);
        }

        delete find_user.password;

        const token = jwt.sign(find_user, "your-wish", { expiresIn: '1d' });

        return {
            message: "User logged in successfully",
            token
        }

    }








}
