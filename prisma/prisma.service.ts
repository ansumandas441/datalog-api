import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy  {
  public readonly prisma: PrismaClient;

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async setOrgContext(organizationId: string) {
    await this.$executeRaw`SELECT set_current_org_id(${organizationId})`;
  }

  withOrgContext(organizationId: string) {
    return this.$extends({
      query: {
        $allOperations: async ({ operation, model, args, query }) => {
          // Set the organization context before each query
          await this.$executeRaw`SELECT set_current_org_id(${organizationId})`;
          return query(args);
        },
      },
    });
  }

  getClient(): PrismaClient {
    return this.prisma;
  }
}
