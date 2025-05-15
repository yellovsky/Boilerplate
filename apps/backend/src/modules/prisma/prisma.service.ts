import { PrismaClient } from '@generated/prisma';
import { Injectable, type OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaServiceImpl extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
