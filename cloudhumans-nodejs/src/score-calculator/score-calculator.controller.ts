import { Controller, Post, Res, Body, HttpException, HttpStatus, Get } from '@nestjs/common'
import { ScoreCalculatorService } from './score-calculator.service';
import { ApplicationDto } from './dto/application.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CloudPro Application')
@Controller('score-calculator')
export class ScoreCalculatorController {
  constructor(private readonly scoreCalculatorService: ScoreCalculatorService) {}

  @Post('/find-eligible-projects')
  calculate(@Body() applicationDto: ApplicationDto) {
    try {
      return this.scoreCalculatorService.findProjectsForApplication(applicationDto);
    } catch (error) {
      if (error?.name === 'ScoreCalculationError') {
        throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
      }
    }
  }
}
