import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScoreCalculatorModule } from './score-calculator/score-calculator.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ScoreCalculatorModule],
})
export class AppModule {}
