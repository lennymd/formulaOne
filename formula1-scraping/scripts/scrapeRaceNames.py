
# I'm going to use this script to get the race names for each eason so I can then feed them into the url pattern and get the race results for each of the F1 races (seasons 1950 to 2019). 

import requests
import urllib.parse as parse
from bs4 import BeautifulSoup
import lxml
from time import sleep
import csv
from pathlib import Path

race_list = [["year", "round", "date", "prix", "winnerFirstName", "winnerLastName", "winnerDriverCode", "winnerConstructor", "laps", "time" "raceUrl"]]
sampleurl = "https://www.formula1.com/en/results.html/1988/races.html"
# sampleout = "../output/raceNames/1988races.txt"
baseurl = "https://www.formula1.com/en/results.html/"

for year in range(1950, 2020):
  completeurl = baseurl + str(year) + "/races.html"
  response = requests.get(completeurl)
  response_clean = parse.unquote(response.text)
  # print(response.url)

  try: 
    # create the bs4 object
    soup = BeautifulSoup(response_clean, "lxml")

    # find the right table on the page
    resultsArchiveTable = soup.find("table", class_="resultsarchive-table").find("tbody")
    races = resultsArchiveTable.find_all("tr")

    for i in range(0,len(races)):
      raceRound = i+1
      race = races[i]
      cols = race.find_all("td")

      # the name of the prix
      raceName = cols[1].find("a").text.strip()
      # the url for the specific prix
      raceUrl = cols[1].find("a").attrs["href"]
      # the date of the race
      raceDate = cols[2].text.strip()
      # the driver who won the race
      raceWinner = cols[3]
      # the raceWinner has pieces that are hidden/shown on different devices, so let's parse it. 
      driverInfo = raceWinner.find_all("span")
      # first name includes middle names like "Juan Manuel" in "Juan Manuel Fangio"
      driverFirstName = driverInfo[0].text.strip()
      # driver's last name
      driverLastName = driverInfo[1].text.strip()
      # the 3-letter driver code
      driverCode = driverInfo[2].text.strip()
      # the team the winning driver drove for
      raceWinnerCar = cols[4].text.strip()

      # laps the driver
      laps = cols[5].text.strip()

      # time to complete race
      time = cols[6].text.strip()

      raceInfo = [year, raceRound, raceDate, raceName, driverFirstName, driverLastName, driverCode, raceWinnerCar, laps, time, raceUrl]
      race_list.append(raceInfo)

  except Exception as e:
    print(e)
  
  print("Done with races from", year)

  if ((year % 10) == 0):
    print("@@--Taking a break after", year,"--@@")
    sleep(1.5)
  else:
    pass

with open("../output/race_list.csv", "w") as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=',')
    csvWriter.writerows(race_list)

print()
print("All done")