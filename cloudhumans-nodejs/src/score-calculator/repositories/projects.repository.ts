import { Injectable } from '@nestjs/common'
import { Project } from '../score-calculator.interfaces'

@Injectable()
export class ProjectsRepository {
  list(): Array<Project> {
    return [
      {
        name: "collect_information_for_xpto",
        minimal_score: 2
      },
      {
        name: "support_users_from_xyz",
        minimal_score: 3
      },
      {
        name: "determine_schrodinger_cat_is_alive",
        minimal_score: 5
      },
      {
        name: "calculate_dark_matter_nasa",
        minimal_score: 10
      },
    ]
  }
}