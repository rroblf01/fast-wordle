from pydantic import BaseModel

class WordRequests(BaseModel):
    word: str

class WordResponse(BaseModel):
    result: list[str]
