FROM python:3.9.19-alpine3.19

WORKDIR /code

COPY . /code

RUN pip install -r /code/requirements.txt

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]