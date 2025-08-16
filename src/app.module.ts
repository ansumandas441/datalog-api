import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { PropertiesModule } from './properties/properties.module';
import { TrackingPlansModule } from './tracking-plans/tracking-plans.module';

@Module({
  imports: [EventsModule, PropertiesModule, TrackingPlansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
