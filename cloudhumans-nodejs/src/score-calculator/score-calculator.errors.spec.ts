import { Test, TestingModule } from '@nestjs/testing';
import { UnderAgeApplicantError } from './score-calculator.errors'

describe('UnderAgeApplicantError', () => {
  let underAgeApplicantError: UnderAgeApplicantError;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UnderAgeApplicantError],
    }).compile();

    underAgeApplicantError = app.get<UnderAgeApplicantError>(UnderAgeApplicantError);
  });

  describe('when the error is instantiated', () => {
    it('should have a name and a message', () => {
      expect(underAgeApplicantError).toHaveProperty('name')
      expect(underAgeApplicantError.name).toEqual('ScoreCalculationError')
      expect(underAgeApplicantError.message).toEqual("Applicant not eligible since it's under age.")
    });
  });
});
