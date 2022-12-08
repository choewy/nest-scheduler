import { CommonModule } from '@/common';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CommonModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
