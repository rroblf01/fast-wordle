import datetime

from .word import Word
from .consts import WORDS


def get_word_class():
    today = datetime.datetime.now().date()
    index = today.toordinal() % len(WORDS)
    return Word(WORDS[index])
