FROM python:3.9.0b4-alpine3.12

RUN apk add build-base libffi-dev openssl-dev --no-cache

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt --no-cache-dir

COPY . /app

EXPOSE 4500

CMD [ "python","app.py" ]