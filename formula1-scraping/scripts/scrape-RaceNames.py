#This script scrapes the names of the races by year so I can use them to get the results table for each race.
import requests
import urllib.parse as parse
from bs4 import BeautifulSoup
import lxml
from time import sleep
import csv
from pathlib import Path

baseurl="https://www.formula1.com/en/results.html/"