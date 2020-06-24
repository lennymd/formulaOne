import requests
from bs4 import BeautifulSoup
from time import sleep
import csv

race_list = [["year", "round", "name", "url"]]
base = "https://www.statsf1.com"

for year in range(1950, 2019):
	# print("Starting", year)
	extras = "/en/" + str(year) +".aspx"
	response = requests.get(base + extras)

	soup = BeautifulSoup(response.text, "lxml")

	races = soup.find("div", class_="yeargp").find_all("div", class_="gp")

	for race in races:
		prix_info = race.find("div", class_="pays").text.strip()
		(round_id, name)= prix_info.split(". ")
		rel_url = race.find("div", class_="flag").find("a").attrs["href"]
		race_list.append([year, round_id, name, rel_url])
	print("Done with", year)
	
	if ((year % 10) == 0):
		print("Pause", year,)
		sleep(1)

with open("../data/from_scripts/statsf1_race_list.csv", "w") as my_csv:
	csv.writer(my_csv, delimiter=',').writerows(race_list)
