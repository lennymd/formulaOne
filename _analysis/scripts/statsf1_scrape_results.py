import requests
from bs4 import BeautifulSoup
from time import sleep
import csv

results_list = [["race_id", "year", "round", "race_name", "position", "p_prelim", "driver", "team", "constructor_long", "extra"]]
base = "https://www.statsf1.com"

abbreviations = {"ab": "retired", "nc":"not classified", "np":"not started", "nq":"not qualified", "npq":"not pre-qualified", "dsq":"disqualified", "exc":"excluded", "f":"widthdrawal", "tf": "parade lap"}

# load the list of races
race_list = []
with open('../data/from_scripts/statsf1_race_list.csv', "r") as f:
	for row in csv.reader(f):
		race_list.append(row)

print("Starting")
for race in race_list[1:]:
	race_id = race_list.index(race)

	# get identifying info from race_list
	year = race[0]
	round_id = race[1]
	race_name = race[2]

	# prep url for request
	relative_url = race[3]
	race_url = base + relative_url
	results_url = race_url.replace(".aspx", "/classement.aspx")

	# create the BeautifulSoup item from the url
	response = requests.get(results_url)
	soup = BeautifulSoup(response.text, "lxml")

	# find the results table in the html
	table = soup.find("table", class_="datatable").find("tbody").find_all("tr")

	# set a starting index for order
	p_index = 1
		# process each row
	for row in table:
		cols = row.find_all("td")

		position = cols[0].text.strip()
		driver = cols[2].text.strip()
		constructor = cols[3].text.strip()
		engine = cols[4].text.strip()
		team_long = constructor + " " + engine
		extra = cols[6].text

		if (driver == ""):
			# row has no driver, so skip to next row
			continue
		else:
			if (position == "&"):
				p = p_index - 1
			elif (position == "dsq"):
				p = -1
			else:
				p = max(p_index, p_index-1)
				p_index += 1

			# add the record we computed

			record_list = [race_id, year, round_id, race_name, position, float(p), driver, constructor, team_long, extra]
		
		results_list.append(record_list)
	
	if ((race_id % 10) == 0):
		sleep(1)
	else: 
		pass
	
	print("Done with race", race_id, "which corresponds to:", year, round_id)


# Check that constructor + team info are in each row:

for row in results_list:
	race_id = row[0]

with open("../data/from_scripts/statsf1_race_results.csv", "w") as my_csv:
	csv.writer(my_csv, delimiter=',').writerows(results_list)
