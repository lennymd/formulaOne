# This script goes through every race result and gets a list of all the constructors. I'll later use this list to create a consistent set of constructor names.

import csv

race_results = []

with open('../data/from_scripts/race_results.csv', "r") as f:
  for row in csv.reader(f):
      race_results.append(row)

constructors = [["year", "constructor", "constructor_clean", "constructor_alt"]]
unique = []

for result in race_results[1:]:
  year = result[1]
  constructor = result[8]
  pair = (year, constructor)

  if pair not in unique:
    # print(pair)
    constructors.append([year, constructor])
  
  unique.append(pair)

with open("../data/from_scripts/constructors_raw.csv", "w") as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=',')
    csvWriter.writerows(constructors)
