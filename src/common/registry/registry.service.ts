import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { DeleteCronJobHandler } from './types';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RegistryService {
  private readonly logger = new Logger(RegistryService.name);

  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  async checkExist(name: string): Promise<boolean> {
    return this.schedulerRegistry.doesExist('cron', name);
  }

  async getCronTask(name: string): Promise<CronJob> {
    return this.schedulerRegistry.getCronJob(name);
  }

  async getInterval(name: string): Promise<() => void | Promise<void>> {
    return this.schedulerRegistry.getInterval(name);
  }

  async deleteInterval(name: string): Promise<void> {
    return this.schedulerRegistry.deleteInterval(name);
  }

  async addInterval(
    name: string,
    milliseconds: number,
    doit: () => void | Promise<void>,
  ) {
    return this.schedulerRegistry.addInterval(
      name,
      setInterval(doit, milliseconds),
    );
  }

  async addCronTask(
    name: string,
    seconds: number,
    doit: () => void | Promise<void>,
  ): Promise<DeleteCronJobHandler> {
    this.schedulerRegistry.addCronJob(
      name,
      new CronJob(`${seconds} * * * * *`, doit),
    );

    const deleteHandler = () => {
      this.schedulerRegistry.deleteCronJob(name);
    };

    return deleteHandler.bind(this.logger.warn);
  }
}
