FROM python:3.9

WORKDIR /code

COPY . /code

RUN pip install -r /code/requirements.txt

CMD ["fastapi", "run", "src/main.py", "--host", "0.0.0.0", "--port", "8000"]