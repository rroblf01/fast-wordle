FROM python:3.9

WORKDIR /code

COPY . /code

RUN pip install -r /code/requirements.txt

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]