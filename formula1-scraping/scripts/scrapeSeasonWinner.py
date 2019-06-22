# I'm going to use this script to get the race names for each eason so I can then feed them into the url pattern and get the race results for each of the F1 races (seasons 1950 to 2019). 

import requests
import urllib.parse as parse
from bs4 import BeautifulSoup
import lxml
from time import sleep
import csv
from pathlib import Path

winner_list = [["year", "constructor"]]
baseurl = "https://www.formula1.com/en/results.html/"

for year in range(1950, 2020):
  completeurl = baseurl + str(year) + "/drivers.html"
  response = requests.get(completeurl)
  response_clean = parse.unquote(response.text)
  # print(response.url)

  try: 
    # create the bs4 object
    soup = BeautifulSoup(response_clean, "lxml")

    # find the right table on the page
    resultsArchiveTable = soup.find("table", class_="resultsarchive-table").find("tbody")
    winner = resultsArchiveTable.find("tr").find_all("td")
    constructor = winner[4].text.strip()
    winner_list.append([year, constructor])

  except Exception as e:
    print(e)
  
  print("Found the winner for", year)

  if ((year % 10) == 0):
    print("@@  Taking a break after", year,"  @@")
    sleep(1)
  else:
    pass

with open("../output/winners.csv", "w") as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=',')
    csvWriter.writerows(winner_list)
