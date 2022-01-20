import { Module } from '@nestjs/common';
import { ScoreCalculatorService } from './score-calculator.service';
import { ScoreCalculatorController } from './score-calculator.controller';
import { ProjectsRepository } from './repositories/projects.repository'

@Module({
  controllers: [ScoreCalculatorController],
  providers: [ScoreCalculatorService, ProjectsRepository]
})
export class ScoreCalculatorModule {}
