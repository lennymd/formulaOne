import requests
from bs4 import BeautifulSoup
from time import sleep, process_time
import csv

race_list = [["year", "round", "name", "url"]]
headers = {"User-Agent": "test"}
BASE_URL = "https://www.statsf1.com"

for year in range(1950, 2020):
    # specify the url for the page
    ending = "/en/" + str(year) + ".aspx"
    response = requests.get(BASE_URL + ending, headers=headers)

    # creat BeautifulSoup object that will be parsed
    soup = BeautifulSoup(response.text, "lxml")

    # find all the races
    races = soup.find("div", class_="yeargp").find_all("div", class_="gp")

    # extract info from each race
    for race in races:
        prix_info = race.find("div", class_="pays").text.strip()

        (round_id, name) = prix_info.split(". ")

        rel_url = race.find("div", class_="flag").find("a").attrs["href"]

        race_list.append([year, round_id, name, rel_url])

    print("Completed", year)

    # add some time buffer every 10 years
    if (year % 9) == 0:
        # print("Pause ", year)
        sleep(1)

with open("../data/race_list_statsf1.csv", "w") as output:
    csv.writer(output, delimiter=",").writerows(race_list)
