import csv

rows = []
with open('constructor_winners.csv', "r") as f:
	for row in csv.reader(f):
		rows.append(row)

clean = rows

for row in rows[1:]:
	i = rows.index(row)
	for col in row[1:]:
		j = row.index(col)
		if (col == ""):
			clean[i][j] = 0

with open("data.csv", "w") as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=',')
    csvWriter.writerows(clean)