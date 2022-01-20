import { Injectable } from '@nestjs/common'
import { ApplicationDto } from './dto/application.dto'
import { UnderAgeApplicantError } from './score-calculator.errors'
import { Project } from './score-calculator.interfaces'
import {
  FIRST,
  NO_CHANGE,
  MINIMAL_AGE,
  SCORES_TABLE,
  VALID_REFERRAL_CODES,
  MINIMAL_SCORABLE_SPEED,
  MINIMAL_ACCEPTABLE_SPEED,
  MINIMAL_ACCEPTABLE_WRITING_RESULT,
  MINIMAL_SCORABLE_WRITING_RESULT,
} from '../constants/score-calculator.constants'
import { ProjectsRepository } from './repositories/projects.repository'

@Injectable()
export class ScoreCalculatorService {
  private steps: Array<Function>

  constructor(private readonly projectsRepository: ProjectsRepository) {
    this.steps = [
      this.checkAge,
      this.scoreEducationLevel,
      this.scoreExperiences,
      this.scoreInterneDownloadSpeed,
      this.scoreInterneUploadSpeed,
      this.scoreReferralCode,
      this.scoreWritingSkills,
      this.returnScore
    ]
    this.bindSteps()
  }

  findProjectsForApplication(applicationDto: ApplicationDto) {
    const score = this.calculate(applicationDto)
    const projects = this.projectsRepository.list()
    return this.matchProjectsByScore(score, projects)
  }

  private matchProjectsByScore(score: number, projects: Array<Project>) {
    const eligibleProjects: Array<string> = []
    const ineligibleProjects: Array<string> = []

    projects.sort(this.sortProjectsByDifficulty)
    projects.forEach(project => {
      if (score >= project.minimal_score) {
        eligibleProjects.push(project.name)
      } else {
        ineligibleProjects.push(project.name)
      }
    })

    return {
      score,
      selected_project: eligibleProjects[FIRST] || '',
      eligible_projects: eligibleProjects,
      ineligible_projects: ineligibleProjects,
    }
  }

  private sortProjectsByDifficulty(projectOne: Project, projectTwo: Project) {
    if (projectOne.minimal_score < projectTwo.minimal_score) return 1

    if (projectOne.minimal_score > projectTwo.minimal_score) return -1

    return NO_CHANGE
  }

  private bindSteps() {
    this.steps = this.steps.map(
      (step, index) => (score, application) => step(score, application, this.steps[index + 1])
    )
  }

  private calculate(application: ApplicationDto) {
    let score = 0
    return this.steps[FIRST](score, application)
  }

  private returnScore = (score: number, _) => score

  private checkAge(score: number, application: ApplicationDto, next: Function) {
    if (application.age < MINIMAL_AGE) throw new UnderAgeApplicantError()

    return next(score, application)
  }

  private scoreEducationLevel(score: number, application: ApplicationDto, next: Function) {
    score += SCORES_TABLE[application.education_level]
    return next(score, application)
  }

  private scoreExperiences(score: number, application: ApplicationDto, next: Function) {
    if (application.past_experiences.sales) score += SCORES_TABLE.sales
    if (application.past_experiences.support) score += SCORES_TABLE.support
    return next(score, application)
  }

  private scoreReferralCode(score: number, application: ApplicationDto, next: Function) {
    if (VALID_REFERRAL_CODES.includes(application.referral_code)) score += SCORES_TABLE.referraL_code
    return next(score, application)
  }

  private scoreInterneDownloadSpeed(score: number, application: ApplicationDto, next: Function) {
    if (application.internet_test.download_speed > MINIMAL_SCORABLE_SPEED) {
      score += SCORES_TABLE.internet_download
    } else if (application.internet_test.download_speed < MINIMAL_ACCEPTABLE_SPEED) {
      score -= SCORES_TABLE.internet_download
    }
    return next(score, application)
  }

  private scoreInterneUploadSpeed(score: number, application: ApplicationDto, next: Function) {
    if (application.internet_test.upload_speed > MINIMAL_SCORABLE_SPEED) {
      score += SCORES_TABLE.internet_upload
    } else if (application.internet_test.upload_speed < MINIMAL_ACCEPTABLE_SPEED) {
      score -= SCORES_TABLE.internet_upload
    }
    return next(score, application)
  }

  private scoreWritingSkills(score: number, application: ApplicationDto, next: Function) {
    if (application.writing_score > MINIMAL_SCORABLE_WRITING_RESULT) {
      score += SCORES_TABLE.good_writing
    } else if (application.writing_score > MINIMAL_ACCEPTABLE_WRITING_RESULT) {
      score += SCORES_TABLE.acceptable_writing
    } else {
      score -= SCORES_TABLE.bad_writing
    }
    return next(score, application)
  }
}
