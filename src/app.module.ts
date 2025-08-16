import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    EventsModule, 
    PropertiesModule, 
    TrackingPlansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
