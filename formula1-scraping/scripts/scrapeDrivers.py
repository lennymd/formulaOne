# I'm going to use this script to get the race names for each eason so I can then feed them into the url pattern and get the race results for each of the F1 races (seasons 1950 to 2019).

import requests
import urllib.parse as parse
from bs4 import BeautifulSoup
from time import sleep
import csv

driver_list = [["year", "season_standing", "driver_first_name",
                "driver_last_name", "driver_code", "driver_nationality", "constructor", "points"]]
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
    resultsArchiveTable = soup.find(
        "table", class_="resultsarchive-table").find("tbody")
    
    for driver in resultsArchiveTable.find_all("tr"):
      cols = driver.find_all("td")

      standing = cols[1].text.strip()
      info = cols[2].find_all("span")
      firstName = info[0].text.strip()
      lastName = info[1].text.strip()
      code = info[2].text.strip()
      nationality = cols[3].text.strip()
      team = cols[4].text.strip()
      points = cols[5].text.strip()

      driver_list.append([year, standing, firstName, lastName, code, nationality, team, points])

  except Exception as e:
    print(e)

  print("Found the drivers for", year)

  if ((year % 10) == 0):
    print("@@  Taking a break after", year, "  @@")
    sleep(1)
  else:
    pass

with open("../output/drivers.csv", "w") as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=',')
    csvWriter.writerows(driver_list)
