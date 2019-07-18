import csv

lines = []
with open("winning_drivers.csv", "r") as f:
	reader = csv.reader(f)
	for row in reader:
		lines.append(row)

for line in lines[1:]:
	driver, value = line
	print('{"Name": \"{}\" }'.format(driver))


# print("{} begins with \"{}\"".format(planet.rjust(10), initial))
# 	{"Name":"Michael Schumacher","Count":7},