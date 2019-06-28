# This script gets the race results from each race using the "race_url" from the scrape_races.py script.

import requests
from bs4 import BeautifulSoup
from time import sleep
import csv

# load the list of races
race_list = []
with open('../data/from_scripts/race_list.csv', "r") as f:
  for row in csv.reader(f):
      race_list.append(row)

# setup
race_results = [["race_id", "year", "round_id", "race_date", "race_name",
                "driver", "code", "constructor", "position", 
                "position_order", "laps", "time", "points"]]
base_url = "https://www.formula1.com"
race_id = 0

for race in race_list[1:]:
  year = race[0]
  round_id = race[1]
  race_date = race[2]
  race_name = race[3]
  race_url = race[4]

  race_id += 1

  complete_url = base_url + race_url
  response = requests.get(complete_url)

  try: 

    soup = BeautifulSoup(response.text, "lxml")
    resultsarchive_table = soup.find("table", class_="resultsarchive-table").find("tbody")
    
    position_order = 0

    for result in resultsarchive_table.find_all("tr"):
      
      position_order += 1

      cols = result.find_all("td")

      position = cols[1].text.strip()
      
      driver_info = cols[3].find_all("span")

      first_name = driver_info[0].text.strip()
      last_name = driver_info[1].text.strip()
      driver = first_name + " " + last_name

      code = driver_info[2].text.strip()

      constructor = cols[4].text.strip()
      laps =cols[5].text.strip()
      time = cols[6].text.strip()
      points = cols[7].text.strip()
      
      race_results.append([race_id, year, round_id, race_date, race_name,
                            driver, code, constructor, position, 
                            position_order, laps, time, points])

  except Exception as e:
    print(e)

  print("Done with race number", race_id)

  if ((race_id % 10) == 0):
    print("[ Pause, ", race_id, "]")
    sleep(2)
  else:
    pass

with open("../data/from_scripts/race_results.csv", "w") as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=',')
    csvWriter.writerows(race_results)
