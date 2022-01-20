import { Test, TestingModule } from '@nestjs/testing'
import { ScoreCalculatorService } from './score-calculator.service'
import { ProjectsRepository } from './repositories/projects.repository'

describe('ScoreCalculatorService', () => {
  let service: ScoreCalculatorService
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
      providers: [ScoreCalculatorService, ProjectsRepository],
    }).compile()

    service = module.get<ScoreCalculatorService>(ScoreCalculatorService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('.findProjectsForApplication', () => {
    describe('when the applicant is under age', () => {
      it('should return an error saying the applicant is under age', () => {
        try {
          const application = { ...baseApplication, age: 7 }

          service.findProjectsForApplication(application)
        } catch (error) {
          expect(error.name).toEqual('ScoreCalculationError')
          expect(error.message).toEqual("Applicant not eligible since it's under age.")
        }
      })
    })

    describe('when the applicant have zero score', () => {
      it('should return all projects as ineligible and no selected project', () => {
        const application = {
          ...baseApplication,
          past_experiences: {
            sales: false,
            support: false
          },
          internet_test: {
            download_speed: 4.9,
            upload_speed: 4.9
          },
          writing_score: 0.4,
          referral_code: "abc123"
        }
        const expectedResult = {
          score: 0,
          selected_project: "",
          eligible_projects: [
          ],
          ineligible_projects: [
            "calculate_dark_matter_nasa",
            "determine_schrodinger_cat_is_alive",
            "support_users_from_xyz",
            "collect_information_for_xpto"
          ]
        }

        const result = service.findProjectsForApplication(application)

        expect(result).toMatchObject(expectedResult)
      })
    })

    describe('when the applicant have low score', () => {
      it('should return a single eligible project and this same project as selected', () => {
        const application = {
          ...baseApplication,
          past_experiences: {
            sales: false,
            support: true
          },
          internet_test: {
            download_speed: 4.9,
            upload_speed: 5.1
          },
          writing_score: 0.2,
          referral_code: "abc123"
        }
        const expectedResult = {
          score: 2,
          selected_project: "collect_information_for_xpto",
          eligible_projects: [
            "collect_information_for_xpto"
          ],
          ineligible_projects: [
            "calculate_dark_matter_nasa",
            "determine_schrodinger_cat_is_alive",
            "support_users_from_xyz",
          ]
        }

        const result = service.findProjectsForApplication(application)

        expect(result).toMatchObject(expectedResult)
      })
    })

    describe('when the applicant have high score', () => {
      it('should return all projects as eligible', () => {
        const application = {
          ...baseApplication,
          past_experiences: {
            sales: true,
            support: true
          },
          internet_test: {
            download_speed: 51,
            upload_speed: 51
          },
          writing_score: 0.9,
          referral_code: "token1234"
        }
        const expectedResult = {
          score: 14,
          selected_project: "calculate_dark_matter_nasa",
          eligible_projects: [
            "calculate_dark_matter_nasa",
            "determine_schrodinger_cat_is_alive",
            "support_users_from_xyz",
            "collect_information_for_xpto"
          ],
          ineligible_projects: []
        }

        const result = service.findProjectsForApplication(application)

        expect(result).toMatchObject(expectedResult)
      })
    })
  })
})
