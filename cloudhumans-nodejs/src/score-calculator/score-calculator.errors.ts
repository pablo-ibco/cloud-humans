export class UnderAgeApplicantError extends Error {
  constructor() {
    const message = "Applicant not eligible since it's under age."
    super(message)
    this.name = "ScoreCalculationError"
  }
}