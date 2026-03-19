import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config'; // Esto asegura que NestJS lea tu archivo .env a tiempo

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 1. Creamos el "Pool" de conexiones
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    // 2. Le ponemos "as any" para que TypeScript deje de pelear por las versiones
    const adapter = new PrismaPg(pool as any);
    
    // 3. Inicializamos PrismaClient
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}