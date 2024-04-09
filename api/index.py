from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from .utils import get_word_class
from .schemas import WordRequests, WordResponse

app = FastAPI()

app.mount("/static", StaticFiles(directory="api/client"), name="static")
templates = Jinja2Templates(directory="api/client/templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/api/resoulve")
def resoulve(wordItem: WordRequests) -> WordResponse:
    word = get_word_class()
    return {"result": word.compare(wordItem.word)}