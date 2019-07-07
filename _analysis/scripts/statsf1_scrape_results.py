import requests
from bs4 import BeautifulSoup
from time import sleep
import csv

results_list = []

# load the list of races
race_list = []
with open('../data/from_scripts/statsf1/race_list.csv', "r") as f:
	for row in csv.reader(f):
		race_list.append(row)

# forloop this later
race = race_list[1]
