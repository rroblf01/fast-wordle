build:
	docker build . -t fast-wordle

up:
	docker run -p 8000:8000 -v .:/code/ --name fastwordle fast-wordle 

start: build up

stop:
	docker stop fastwordle

localserver:
	uvicorn api.index:app --host 0.0.0.0 --port 8000 --reload
