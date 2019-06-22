# This script is for scraping the race results for each race using the raceUrls I gathered from my scrapeRaceNames script.

import requests
import urllib.parse as parse
from bs4 import BeautifulSoup
import lxml
from time import sleep
import csv
from pathlib import Path

race_results = [["raceId", "year", "raceRound", "date", "prix", "driverFirstName", "driverLastName",
                "driverCode", "constructor", "finishingPosition", "positionOrder", "laps", "time", "points"]]
baseurl = "https://www.formula1.com"


#import the race_list I scraped before:
race_list = []
with open('../output/race_list_updated.csv', "r") as csvDataFile:
  csvReader = csv.reader(csvDataFile)
  for row in csvReader:
      race_list.append(row)

# check that rows were added to race_list properly
# print(race_list[1])
# print(race_list[2])

# this will be a counter for the races, first race will be 1, last race will be 1007 (as of 190622)
raceId = 0

for race in race_list[1:]:
  #let's get the raceId to be an actual number
  raceId += 1

  #info for the final race_results
  year = race[0]
  raceRound = race[1]
  date = race[2]
  prix = race[3]

  # the URL we'll be scraping from is the base + the relativeURL to the race results table for a particular race
  raceUrl = baseurl+race[-1]

  response = requests.get(raceUrl)
  response_clean = parse.unquote(response.text)
  # print(response.url)

  try: 
    # create the bs4 object so we can get the info we need
    soup = BeautifulSoup(response_clean, "lxml")
    
    # the table we want is the same from when we scraped race Names
    resultsArchiveTable = soup.find("table", class_="resultsarchive-table").find("tbody")
    # print(resultsArchivetable)
    
    # each driver result for the race is a single row in this table
    results = resultsArchiveTable.find_all("tr")
    # let's add a positionOrder to count the finishing position of the drivers that includes the ones who were not classified.
    positionOrder = 0

    for i in range(0,len(results)):
      positionOrder +=1
      result = results[i]
      cols = result.find_all("td")
      
      # the first and last <td> items are empty and have class "limiter" so we ignore those when processing things.
      
      finishingPosition = cols[1].text.strip()
      
      # the number of the driver's car in this race
      driverNumer = cols[2].text.strip()
      
      # driver name information is split again into the same three fields
      driverInfo = cols[3].find_all("span")
      
      # driver's first name
      driverFirstName = driverInfo[0].text.strip()
      
      # driver's last name
      driverLastName = driverInfo[1].text.strip()
      
      # the 3-letter driver code
      driverCode = driverInfo[2].text.strip()
      
      # the constructor the driver was racing for
      constructor = cols[4].text.strip()
      
      # the number of laps the driver completed
      laps = cols[5].text.strip()

      # how long it took them to finish the race or whether they finished the race or not
      time = cols[6].text.strip()
      
      # the points the driver got based on their finishing positions
      points = cols[7].text.strip()

      driver_result = [raceId, year, raceRound, date, prix, driverFirstName, driverLastName, driverCode, constructor, finishingPosition, positionOrder, laps, time, points]

      # print(driver_result)
      
      race_results.append(driver_result)

  except Exception as e:
    print(e)

  print("Done with race number", raceId)

  if ((raceId % 10) == 0):
    print("@@ Taking a break after race", raceId, " @@")
    sleep(1.5)
  else:
    pass

with open("../output/results_all_updated.csv", "w") as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=',')
    csvWriter.writerows(race_results)
