import { Controller, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AppServiceEmitterEvent } from './enums';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @OnEvent(AppServiceEmitterEvent.EverySeconds)
  async evenySeconds() {
    return this.logger.verbose('Called every seconds');
  }

  @OnEvent(AppServiceEmitterEvent.Every10Seconds)
  async eveny10Seconds() {
    return this.logger.debug('Called every 10 seconds');
  }

  @OnEvent(AppServiceEmitterEvent.Every20Seconds)
  async eveny20Seconds() {
    return this.logger.warn('Called every 20 seconds');
  }
}
