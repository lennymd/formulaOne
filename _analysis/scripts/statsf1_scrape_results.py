import requests
from bs4 import BeautifulSoup
from time import sleep
import csv

results_list = []
base = "https://www.statsf1.com"
abbreviations = {"ab": "retired", "nc":"not classified", "np":"not started", "nq":"not qualified", "npq":"not pre-qualified", "dsq":"disqualified", "exc":"excluded", "f":"widthdrawal", "tf": "parade lap"}

# load the list of races
race_list = []
with open('../data/from_scripts/statsf1/race_list.csv', "r") as f:
	for row in csv.reader(f):
		race_list.append(row)

# forloop this later
race = race_list[1]

year = race[0]
round_id = race[1]
race_name = race[2]

relative_url = race[3]
race_url = base + relative_url
results_url = race_url.replace(".aspx", "/classement.aspx")

response = requests.get(results_url)

soup = BeautifulSoup(response.text, "lxml")

table = soup.find("table", class_="datatable").find("tbody").find_all("tr")
p_index = 1
for row in table:
	cols = row.find_all("td")

	position = cols[0].text.strip()
	driver = cols[2].text.strip()
	constructor = cols[3].text.strip()
	engine = cols[4].text.strip()
	team_long = constructor + " " + engine
	extra = cols[6].text

	if (position == ""):
		continue
	else:
		# add the record we computed

		if (position == "&"):
			p = p_index - 1
		else:
			p = max(p_index, p_index-1)
			p_index += 1

		record_list = [year, round_id, race_name, position,
                 p, driver, constructor, team_long, extra]
	
	results_list.append(record_list)
	

with open("../data/from_scripts/statsf1/race_results.csv", "w") as my_csv:
	csv.writer(my_csv, delimiter=',').writerows(results_list)
