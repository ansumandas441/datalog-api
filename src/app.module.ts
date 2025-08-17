import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/_common/prisma-service/prisma.service';
import { JwtGuard } from './_common/guards/jwt-guard';
import { PrismaModule } from './_common/prisma-service/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { PropertiesModule } from './properties/properties.module';
import { TrackingPlansModule } from './tracking-plans/tracking-plans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    PrismaModule,
    EventsModule, 
    PropertiesModule, 
    TrackingPlansModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
