import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { AppServiceEmitterEvent } from './enums';

@Injectable()
export class AppService {
  constructor(private readonly emitter: EventEmitter2) {}

  @Cron('* * * * * *')
  async everySeconds() {
    await this.emitter.emitAsync(AppServiceEmitterEvent.EverySeconds);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async every10Seconds() {
    await this.emitter.emitAsync(AppServiceEmitterEvent.Every10Seconds);
  }

  @Interval(20000)
  async every20Seconds() {
    await this.emitter.emitAsync(AppServiceEmitterEvent.Every20Seconds);
  }
}
