
# This script gets the list of the all the F1 races in each year and importantly the url to the specific race's results.

import requests
import urllib.parse as parse
from bs4 import BeautifulSoup
import lxml
from time import sleep
import csv
from pathlib import Path

race_list = []
sampleurl = "https://www.formula1.com/en/results.html/1988/races.html"
# sampleout = "../output/raceNames/1988races.txt"
baseurl = "https://www.formula1.com/en/results.html/"

for year in range(1950, 1951):
  completeurl = baseurl + str(year) + "/races.html"
  response = requests.get(completeurl)
  response_clean = parse.unquote(response.text)
  # print(response.url)

  try: 
    # create the bs4 object
    soup = BeautifulSoup(response_clean, "lxml")

    # find the right table on the page
    resultsarchive_table = soup.find("table", class_="resultsarchive-table").find("tbody")

    race_id = 0
    for race in resultsarchive_table.find_all("tr"):
      race_id += 1
      cols = race.find_all("td")

      # race name and url are in the first column's a tag.
      prix = cols[1].find("a")
      race_name = prix.text.strip()
      race_url = prix.attrs["href"]
      race_date = cols[2].text.strip()
      laps = cols[5].text.strip()

      # We don't need the other columns, but here they are defined:
      # * cols[3]: the name of the driver who won the race, separated into three spans:
      # first_name, last_name, driver_code
      # * cols[4]: the name of the constructor who won the race
      # * cols[6]: finishing time for the winning driver

      if laps == "null":
        # There are 3 instances of first place being shared by 2 drivers, the second driver's laps are listed as "null". To avoid adding the race more than once, we skip it.
        pass
      else: 
        race_list.append([year, race_id, prix, race_name, race_date, race_url])

  except Exception as e:
    print(e)
  
  print("Done with races from", year)

  if ((year % 5) == 0):
    print("@@--Taking a break after", year,"--@@")
    sleep(1)
  else:
    pass

with open("../data/scraped/race_list.csv", "w") as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=',')
    csvWriter.writerows(race_list)

print()
print("All done")
