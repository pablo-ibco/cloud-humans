import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsNumber, IsOptional, Min, Max, IsIn } from 'class-validator'

const POSSIBLE_EDUCATION_LEVELS = ['high_school', 'bachelors_degree_or_high']

class PastExperiences {
    @ApiProperty({ default: false })
    @IsBoolean()
    sales: boolean

    @ApiProperty({ default: true })
    @IsBoolean()
    support: boolean
}

class InternetTest {
    @ApiProperty({ default: 50.4 })
    @IsNumber()
    download_speed: number

    @ApiProperty({ default: 40.2 })
    @IsNumber()
    upload_speed: number
}

export class ApplicationDto {
    @ApiProperty({ default: 35 })
    @IsInt()
    @Min(0)
    age: number

    @ApiProperty({ default: 'high_school' })
    @IsIn(POSSIBLE_EDUCATION_LEVELS)
    education_level: string

    @ApiProperty()
    past_experiences: PastExperiences

    @ApiProperty()
    internet_test: InternetTest

    @ApiProperty({ default: 0.6 })
    @IsNumber()
    @Min(0)
    @Max(1)
    writing_score: number

    @ApiProperty({ default: 'token1234' })
    @IsOptional()
    referral_code: string
}
