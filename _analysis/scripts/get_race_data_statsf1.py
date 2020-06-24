import requests
from bs4 import BeautifulSoup
from time import sleep
import csv

race_data_list = [
    [
        "race_id",
        "year",
        "round",
        "race_name",
        "position",
        "p_prelim",
        "driver",
        "team",
        "constructor_long",
        "extra",
    ]
]
BASE_URL = "https://www.statsf1.com"

ABBREVIATIONS = {
    "ab": "retired",
    "nc": "not classified",
    "np": "not started",
    "nq": "not qualified",
    "npq": "not pre-qualified",
    "dsq": "disqualified",
    "exc": "excluded",
    "f": "widthdrawal",
    "tf": "parade lap",
}

# headers for request
HEADERS = {"User-Agent": "test"}

# load the list of races
race_list = []
with open("./../data/race_list_statsf1.csv", "r") as input_file:
    race_list = [row for row in csv.reader(input_file)]

for race in race_list[1:]:
    race_id = race_list.index(race)

    # get columns from race_list
    year, round_id, race_name, relative_url = race

    # prep url for request
    race_url = BASE_URL + relative_url.replace(".aspx", "/classement.aspx")

    # make request and prepare BS object
    response = requests.get(race_url, headers=HEADERS)
    soup = BeautifulSoup(response.text, "lxml")

    results_table = soup.find("table", class_="datatable").find("tbody").find_all("tr")

    # set starting index for order
    p_index = 1

    # process each row
    for row in results_table:
        # get all the columns
        cols = row.find_all("td")

        # collect all the quick info
        position = cols[0].text.strip()
        driver = cols[2].text.strip()
        constructor = cols[3].text.strip()
        engine = cols[4].text.strip()
        team_long = '-'.join([constructor, engine])
        extra = cols[6].text

        if driver == "":
            # row has no driver info
            # skip to next row
            continue
        else:
            if position == "&":
                # driver finish tied to previous row
                p = p_index - 1
            elif position == "dsq":
                # driver disqualified
                p = -1
            else: 
                p = max(p_index, p_index-1)
                p_index += 1

            # create the record we'll be saving
            record = [
                race_id,
                year,
                round_id,
                race_name,
                position,
                float(p),
                driver,
                constructor,
                team_long,
                extra
                ]

        race_data_list.append(record)

    # pause for a while
    if ((race_id - 1) % 5) == 0:
        print("Pausing")
        sleep(1)
    else:
        pass

    print("Done with race", race_id, "which was", year, race_name)

with open("../data/race_results_statsf1.csv", "w") as output: 
    csv.writer(output, delimiter=",").writerows(race_data_list)
