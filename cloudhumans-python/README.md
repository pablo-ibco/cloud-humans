# CloudHumans API

## Approach

Simple API builded in `Python` using `Flask` as framework and `factory method` as pattern, on a `single-file` approach. This approach was chosen because the goal was to build a straightforward API with one endpoint, in a pretty simple way.

- I choose to be inspired by the `factory pattern`, with a functional programming approach, because we have a lot of operations needed for one endpoint; factory is a good pattern for applications like that. Here on this case, we didn't used the pattern on all its principles, because we didn't need that for a so simple API.


## How to run?

Dependencies:
* `pip`
* `python`
* `Docker`

This project was built with [Docker](https://www.docker.com/).
You can use it, or simply:

`pip3 install -r requirements.txt && python3 app.py`

### Running with Docker
```bash
docker-compose up --build
```

### Using the application

After the server starts, you can check if it's up on `http://localhost:4500/`. After that, you can use the following endpoint:

```bash
curl --location --request POST 'http://localhost:4500/score-calculator/find-eligible-projects' \
--header 'accept: */*' \
--header 'Content-Type: application/json' \
--data-raw '{
  "age": 35,
  "education_level": "high_school",
  "past_experiences": {
    "sales": true,
    "support": true
  },
  "internet_test": {
    "download_speed": 1,
    "upload_speed": 1
  },
  "writing_score": 0.3,
  "referral_code": "token1234"
}'
```
