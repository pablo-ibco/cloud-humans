from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Consts
projects = [
    {
        "name": "collect_information_for_xpto",
        "minimal_score": 2
    },
    {
        "name": "support_users_from_xyz",
        "minimal_score": 3
    },
    {
        "name": "determine_schrodinger_cat_is_alive",
        "minimal_score": 5
    },
    {
        "name": "calculate_dark_matter_nasa",
        "minimal_score": 10
    },
]

SCORES_TABLE = {
  "high_school": 1,
  "bachelors_degree_or_high": 2,
  "sales": 5,
  "support": 3,
  "referraL_code": 1,
  "upload_speed": 1,
  "download_speed": 1,
  "good_writing": 2,
  "acceptable_writing": 1,
  "bad_writing": 1
}
MINIMAL_AGE = 18
MINIMAL_ACCEPTABLE_SPEED = 5
MINIMAL_SCORABLE_SPEED = 50
MINIMAL_SCORABLE_WRITING_RESULT = 0.7
MINIMAL_ACCEPTABLE_WRITING_RESULT = 0.3
VALID_REFERRAL_CODES = ['token1234']
FIRST = 0
NO_CHANGE = 0

# Functions
def scoreEducationLevel(education_level):
    result = 0
    result = result + SCORES_TABLE[education_level]
    return result

def scoreExperiences(sales, support):
    result = 0
    if sales: 
        result = result + SCORES_TABLE["sales"]
    if support:
        result = result + SCORES_TABLE["support"]
    return result

def scoreInternetDownloadSpeed(download_speed):
    result = 0
    if download_speed > MINIMAL_SCORABLE_SPEED:
      result = result + SCORES_TABLE["download_speed"]
    else:
        if download_speed < MINIMAL_ACCEPTABLE_SPEED:
            result = result - SCORES_TABLE["download_speed"]
    return result

def scoreInterneUploadSpeed(upload_speed):
    result = 0
    if upload_speed > MINIMAL_SCORABLE_SPEED:
      result = result + SCORES_TABLE["upload_speed"]
    else:
        if upload_speed < MINIMAL_ACCEPTABLE_SPEED:
            result = result - SCORES_TABLE["upload_speed"]
    return result

def scoreReferralCode(referral_code):
    result = 0
    if VALID_REFERRAL_CODES.__contains__([referral_code]):
        result = result + SCORES_TABLE["referral_code"]
    return result

def scoreWritingSkills(writing_score):
    result = 0
    if writing_score > MINIMAL_SCORABLE_WRITING_RESULT:
      result = result + SCORES_TABLE['good_writing']
    elif writing_score > MINIMAL_ACCEPTABLE_WRITING_RESULT:
      result = result + SCORES_TABLE['acceptable_writing']
    else:
      result = result - SCORES_TABLE['bad_writing']
    return result

def buildResult(score):

    eligibleProjects = []
    ineligibleProjects = []

    for project in projects:
        if score >= project['minimal_score']:
            eligibleProjects.append(project['name'])
        else:
            ineligibleProjects.append(project['name'])

    return json.dumps({
      "score": score,
      "selected_project": eligibleProjects[0] or '',
      "eligible_projects": eligibleProjects,
      "ineligible_projects": ineligibleProjects,
    })

# Routes

@app.before_request
def clear_trailing():
    from flask import redirect, request
    rp = request.path 
    if rp != '/' and rp.endswith('/'):
        return redirect(rp[:-1])

@app.errorhandler(404)
def route_not_found(e):
    return "The resource could not be found.", 404

@app.route('/', methods = ['GET'])
def server_up():
    return 'API server is up!', 200

@app.route('/score-calculator/find-eligible-projects', methods = ['POST'])
def calculate():
    content = request.get_json()

    age = content['age']
    
    if age < MINIMAL_AGE:
        return 'Applicant not eligible since its under age.', 400

    education_level = content['education_level']
    sales = content['past_experiences']['sales']
    support = content['past_experiences']['support']
    download_speed = content['internet_test']['download_speed']
    upload_speed = content['internet_test']['upload_speed']
    writing_score = content['writing_score']
    referral_code = content['referral_code']

    score = scoreEducationLevel(education_level) + scoreExperiences(sales, support) + \
        scoreInternetDownloadSpeed(download_speed) + scoreInterneUploadSpeed(upload_speed) + \
        scoreReferralCode(referral_code) + scoreWritingSkills(writing_score)
    
    result = buildResult(score)

    return result, 200

# Starting the App
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4500)