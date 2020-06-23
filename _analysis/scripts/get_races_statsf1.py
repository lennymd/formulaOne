import requests
import csv
from bs4 import BeautifulSoup
from time import sleep

race_list = [["year", "round", "name", "url"]]

BASE_URL = "https://www.statsf1.com/en/"

# for year in range(1950, 2020):
year = 2019
ending = str(year) + ".aspx"
print(BASE_URL + ending)
response = requests.get(BASE_URL + ending)

print(response.text)
