import { HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ScoreCalculatorController } from './score-calculator.controller'
import { ScoreCalculatorService } from './score-calculator.service'
import { ProjectsRepository } from './repositories/projects.repository'

describe('ScoreCalculatorController', () => {
  let service: ScoreCalculatorService
  let controller: ScoreCalculatorController
  const baseApplication = {
    age: 35,
    education_level: "high_school",
    past_experiences: {
      sales: false,
      support: true
    },
    internet_test: {
      download_speed: 50.4,
      upload_speed: 40.2
    },
    writing_score: 0.6,
    referral_code: "token1234"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreCalculatorController],
      providers: [ScoreCalculatorService, ProjectsRepository],
    }).compile()

    service = module.get<ScoreCalculatorService>(ScoreCalculatorService)
    controller = module.get<ScoreCalculatorController>(ScoreCalculatorController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('.calculate', () => {
    describe('when the service throws an error purpositaly', () => {
      it('should thrown an http exception based on the service error', () => {
        try {
          const application = { ...baseApplication, age: 7 }

          controller.calculate(application)
        } catch (error) {
          expect(error.message).toEqual("Applicant not eligible since it's under age.")
          expect(error.status).toEqual(HttpStatus.UNPROCESSABLE_ENTITY)
        }
      })
    })

    describe('when the service runs with not errors', () => {
      it('should return a json object', () => {
        const application = { ...baseApplication }
        const mockResult = {
          score: 7,
          selected_project: "determine_schrodinger_cat_is_alive",
          eligible_projects: ["determine_schrodinger_cat_is_alive", "support_users_from_xyz", "collect_information_for_xpto"],
          ineligible_projects: ["calculate_dark_matter_nasa"]
        }
        jest.spyOn(service, 'findProjectsForApplication').mockImplementation(() => mockResult)

        const result = controller.calculate(application)

        expect(result).toMatchObject(mockResult)
      })
    })
  })
})
