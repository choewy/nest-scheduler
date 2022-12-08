import { AlreadyExistTaskException, RegistryService } from '@/common';
import { Controller, Get, Logger, Param } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AppServiceEmitterEvent } from './enums';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly registryService: RegistryService) {}

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

  @Get(':name')
  async addTask(@Param() params: { name: string }): Promise<void> {
    const taskName = params.name;

    if (await this.registryService.checkExist(taskName)) {
      throw new AlreadyExistTaskException();
    }

    const seconds = 5000;
    await this.registryService.addInterval(taskName, seconds, () => {
      this.logger.log(`Called ${taskName} ${seconds / 1000} seconds`);
      return this.registryService.deleteInterval(taskName);
    });
  }
}
