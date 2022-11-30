import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    createUser(userData: { name?: string; email: string; password?: string; role?: string; }): import(".prisma/client").User | PromiseLike<import(".prisma/client").User> {
      throw new Error('Method not implemented.');
    }
    create(arg0: { data: import(".prisma/client").Prisma.UserCreateInput; }): import(".prisma/client").User | PromiseLike<import(".prisma/client").User> {
      throw new Error('Method not implemented.');
    }
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}