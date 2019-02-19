from bs4 import BeautifulSoup
from urllib.request import urlopen
import re
import json
def get_word():
    url = "https://www.wordnik.com/randoml"
    f = urlopen(url)
    soup = BeautifulSoup(f, "html.parser")
    h1s = soup("h1")
    h1 = h1s[0].getText().strip()
    return(h1)
get_word()