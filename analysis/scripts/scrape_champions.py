# This script gets the team information of the driver who got first place in each season's driver's championship.

import requests
from bs4 import BeautifulSoup
from time import sleep
import csv

winner_list = [["year","constructor"]]
base_url = "https://www.formula1.com/en/results.html/"

for year in range(1950, 2020):
  complete_url = base_url + str(year) + "/drivers.html"
  response = requests.get(complete_url)

  try:

    soup = BeautifulSoup(response.text, "lxml")
    resultsarchive_table = soup.find("table", class_="resultsarchive-table").find("tbody")
    winner = resultsarchive_table.find("tr").find_all("td")
    constructor = winner[4].text.strip()
    winner_list.append([year, constructor])

  except Exception as e:
    print(e)
  
  print("Found the winner for", year)

  if ((year % 10) == 0):
    print("@@ Taking a break after", year)
    sleep(1)
  else:
    pass

with open("../data/from_scripts/winning_teams.csv", "w") as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=',')
    csvWriter.writerows(winner_list)
