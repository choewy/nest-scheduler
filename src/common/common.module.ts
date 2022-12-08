import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { RegistryModule } from './registry';

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    RegistryModule,
  ],
  exports: [RegistryModule],
})
export class CommonModule {}
