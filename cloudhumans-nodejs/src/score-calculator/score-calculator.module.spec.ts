import { Test } from '@nestjs/testing'
import { ScoreCalculatorModule } from './score-calculator.module'


describe('ScoreCalculatorModule', () => {
  let scoreCalculatorModule: ScoreCalculatorModule

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ScoreCalculatorModule],
    }).compile()

    scoreCalculatorModule = module.get<ScoreCalculatorModule>(ScoreCalculatorModule)
  })

  it('should the correct value', () => {
    expect(scoreCalculatorModule).toBeDefined()
  })
})