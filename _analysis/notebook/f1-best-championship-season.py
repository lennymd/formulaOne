# To add a new cell, type '#%%'
# To add a new markdown cell, type '#%% [markdown]'
#%% Change working directory from the workspace root to the ipynb file location. Turn this addition off with the DataScience.changeDirOnImportExport setting
# ms-python.python added
import os
try:
	os.chdir(os.path.join(os.getcwd(), '_analysis/notebook'))
	print(os.getcwd())
except:
	pass
#%% [markdown]
# # Looking for the best Formula 1 season
# 
# For my master's project, I'm making a piece about answering the question: **What championship winning team had the best Formula 1 season?**
# 
# To answer this question, I'll be checking three definitions of best:
# 
# 1. most wins in a season
# 1. most podiums in a season
# 1. how close was the performance to perfect
# 
# To do this I was working with data provided by the [Ergast Developer API](https://ergast.com/mrd/). I noticed an error in the driver-constructor pairing for the 1950 season and wanted to verify things without moving forward. I was originally going to create a table of the driver-constructor pairs for each race, and then compare it with the data I had.
# 
# Instead I went straight to the source for F1 information, [formula1.com](https://formula1.com), and scraped race information for each race from 1950 to 2018. There were some holes with how disqualifications and withdrawal were recorded (or not, in this case) as we went back in time to earlier seasons.
# 
# Now I've gone and gotten data from [statsf1.com](https://www.statsf1.com/) which is tabulated in an easy to understand manner and is more complete than the formula1.com data.

#%%
import pandas as pd
import numpy as np


#%%
race_results = pd.read_csv("../data/from_scripts/statsf1_race_results.csv")


#%%
race_results.head(30)

#%% [markdown]
# Let's verify that we have the right number of races. Between 1950 and the end of the 2018 season there were 997 races.

#%%
race_results.race_id.max()

#%% [markdown]
# Before we get to analysis, there is some processing that needs to be done. First I want to fill in the teams.

#%%
def update_teams(row):
    prev = race_results.iloc[row.name -1]
    if row.position == "&":
        return prev.team
    else:
        return row.team
    
def update_constructor_long(row):
    prev = race_results.iloc[row.name -1]
    if row.position == "&":
        return prev.constructor_long
    else:
        return row.constructor_long


#%%
race_results["team"] = race_results.apply(update_teams, axis=1)
race_results["constructor_long"] = race_results.apply(update_teams, axis = 1)


#%%
race_results.head(30)

#%% [markdown]
# Now we can look at processing the finishing order.  In scraping I had created a rough version of the final order, but now I want to refine it more.
# 
# The position column gives us information about how the driver fared in the race. There are several options:
# 
# * If the position is a number (in string form or otherwise) then that is the finishing position of the driver.
# * If the position is `&` then that driver record is for a shared drive and the finishing position of that driver is the same as the record directly above it.
# * If the position is `ab` then the driver retired during the race. The later they retired, the higher they ranked.
# * IF the position is `nc` the driver did not classify for the final positions, but did complete most of the race.
# * If the position is `f` then the driver withdrew from a race. They will ranked as the last possible spot.
# * If the position is `np` then the driver did not star the race, but was on the grid. They will be ranked as the last possible spot.
# * If the position is `dsq`, the driver was disqualified and their finishing position will be the the last possible spot.
# * If the position is `npq`, `nq`, `tf` or `exc` the driver's order will be ignored. 
# 
# We'll do it in two parts, first updating everything but the shared drives.

#%%
def p_final(row):
    race = race_results[race_results.race_id == row.race_id]
    last_place = race.p_prelim.max()
    avg_retire = np.round(race[race.position.isin(["ab", "nc"])].p_prelim.mean())
    
    if (row.position == "dsq") or (row.position == "f") or (row.position == "np"):
        return last_place
    else:
        return row.p_prelim

#%% [markdown]
# And then updating the shared drives:

#%%
shared_drives = race_results.index[race_results.position == "&"].tolist()

def update_p_final(row):
    prev = race_results.iloc[row.name -1]
    if row.name in shared_drives:
        return prev.p_final
    else:
        return row.p_final


#%%
race_results["p_final"] = race_results.apply(p_final, axis =1)
race_results["p_final"] = race_results.apply(update_p_final, axis=1)


#%%
race_results[race_results.race_id == 273]


#%%
race_results[race_results.race_id == 273]

#%% [markdown]
# I will work with a slice of this `race_results` dataFrame that only includes the team in their championship winning season. Let's make that slice now:

#%%
winning_teams = pd.read_csv("../data/other/winning_teams_statsf1_v2.csv")
winning_teams.head(15)

#%% [markdown]
# Now we combine this dataframe with the `race_results` one:

#%%
combine = pd.merge(race_results, winning_teams, how="left", on=["year", "team"], indicator="keep")


#%%
combine[combine.race_id == 1]


#%%
results = combine[combine.keep == "both"]


#%%
results[results.year == 1982]

#%% [markdown]
# And those are all the result records for Williams in 1982.
# 
# We can drop the `keep` column, save a copy of this data, and start doing the three analyses.

#%%
results = results.drop(columns=["keep"])


#%%
results.to_csv("../data/other/race_results_champions.csv", index=False)

#%% [markdown]
# ---
# 
# ## Method 01: Wins
# 
# Let's compare championship seasons by how many wins each team got in their season.
# 
# We can look for wins by doing one of two things:
# 
# * pick all rows where `p_final == 1`
# * pick all rows where `position == "1"`
# 
# In terms of wins, there were three races where two drivers shared first: 1951 French GP (Alfa Romeo), 1956 Argentine GP (Ferrari), and 1957 British GP (Vanwall).
# 
# For this analysis I care more that the constructor/team finished first than I do about it being a shared drive. By selecting rows using the position column, I also don't have to worry about shared drives.
# 

#%%
wins = results[results.position == "1"]


#%%
wins.head(12)


#%%
wins[wins.year== 1982]

#%% [markdown]
# Now that we've verified the wins are correct, let's do the counting:

#%%
win_count = wins.groupby(["year", "team"]).p_final.count().rename("wins")


#%%
win_count.sort_values(ascending=False).head(10)

#%% [markdown]
# Let's take it from a series to a dataframe:

#%%
win_count = win_count.to_frame().reset_index()


#%%
win_count.sort_values(by="wins",ascending=False).head(10)

#%% [markdown]
# To better compare things we should also normalize by the number of races in each season. We'll compute the percentage of races won in each season.

#%%
def find_num_races(row):
    season = results[results.year == int(row.year)]
    return season["round"].max()

def get_win_percentage(row):
    w = float(row.wins)
    total = float(row.races)
    return (w/total)*100


#%%
win_analysis = win_count.copy()


#%%
win_analysis["races"] = win_count.apply(find_num_races, axis=1)


#%%
win_analysis.sort_values(by="wins",ascending=False).head(10)


#%%
win_analysis["win_percentage"] = win_analysis.apply(get_win_percentage, axis=1)


#%%
win_analysis.sort_values(by="wins", ascending=False).head(10)

#%% [markdown]
# And looking at the percentages:

#%%
win_analysis.sort_values(by="win_percentage", ascending=False).head(10)

#%% [markdown]
# McLaren's 1988 run is ~4% better than Mercedes's 2016 run.
# 
# Let's save this analysis for plotting purposes in the piece.

#%%
win_analysis.to_csv("../data/output/win_analysis.csv", index=False)

#%% [markdown]
# ---
# 
# ## Method 02: Podiums
# 
# Looking at the wins is a good start, but there are a lot of factors about the team's performance over a season that it leaves out.
# 
# * It only shows a very narrow slice of the team's drivers's performance. If we only know that one of the drivers won, we have no idea how the other driver did.
# * It offers a limited amount of comparison. Winning is a binary variable — you win or you don't. When looking at the history of the sport, things are greyer. For example, Keke Rosberg won the driver's cup in 1982, but he only had one victory that season. Looking only at the number of wins doesn't provide any context about how this happened.
# 
# We can dig a little deeper and look at podiums. The podium refers to the drivers who finished first, second, and third in any given race. A team that consistenly has both drivers on the podium over a season is doing amazing. (ex: Mercedes's dominance is better understood when you see Bottas and Hamilton on podium for almost every race of 2019 so far.)

#%%
podiums = results[results.position.isin(["1","2", "3", 1, 2, 3])]


#%%
podiums.head(21)

#%% [markdown]
# By again using the `position` column we can deal with the shared drives.

#%%
podium_count = podiums.groupby(["year", "team"]).p_final.count().rename("podium_spots_claimed")


#%%
podium_count.sort_values(ascending=False).head(10)


#%%
podium_count = podium_count.to_frame().reset_index()

#%% [markdown]
# We'll want to normalize this as well, but a little different. We want to take into account that there are different number of races and different number of drivers in each race (usually 2 drivers per team per race, but they sometimes have a third subbing in for one of the two, or in the earlier years, they had more than 2 drivers.)
# 
# To account for this, we'll look at each race and count the number of unique drivers who raced. We'll ignore the drivers whose `position` value is one of the following:
# 
# * nq: not qualified
# * npq: not pre-qualified
# * exc: excluded
# * tf: parade lap
# 
# We'll keep in the drivers whose `position` value was:
# 
# * a number spot
# * ab: retired
# * nc: not classified
# * np: not started
# * f: withdrawal
# 
# 
# For each race, we'll compute the minimum between 3 and the number of drivers for the team in that race. The reason for picking the minimum between 3 and number of drivers is that the max number of podium spots for any race is 3 and if a team only brought two drivers, their best they can do is get two podiums.

#%%
keep_out = ["nq", "npq", "exc", "tf"]
race_entries = results[~results.position.isin(keep_out)]

def podium_spots(row):
    season = race_entries[race_entries.year == row.year]
    team = season[season.team == row.team]
    races = team["round"].unique()
    spots = 0
    
    for race in races:
        driver_entries = team[team["round"] == race].driver.nunique()
        spots += min(3, driver_entries)
    
    return spots

def podium_percentage(row):
    p = float(row.podium_spots_claimed)
    total = float(row.podium_spots_available)
    return (p/total) * 100


#%%
podium_analysis = podium_count.copy()


#%%
podium_analysis.head(10)


#%%
podium_analysis["podium_spots_available"] = podium_count.apply(podium_spots, axis=1)


#%%
podium_analysis.sort_values(by="podium_spots_claimed",ascending=False).head(10)


#%%
podium_analysis["podium_percentage"] = podium_analysis.apply(podium_percentage, axis=1)


#%%
podium_analysis.sort_values(by="podium_percentage", ascending=False).head(10)

#%% [markdown]
# While Mercedes's 2016 run has the most podiums (they also had most wins), their podium percentage is only the fifth highest. Of their 33 podium spots, 19 are first place finishes. From the other 14 podium spots we can see they didn't have both drivers on the podium for 7 of the season's 21 races.
# 
# Their 2015 and 2014 percentages were way better in terms of podiums.
# 
# Looking at McLaren's 1988 run, they also had a lower podium percentage. This could be related to their car performance or driver mistakes costing them podiums.
# 
# Third place Ferrari is also down to fourth from third, but still higher than Mercedes 2016 or McLaren 1988 -- that F2002 was really robust.
# 
# We can save this podium analysis now.

#%%
podium_analysis.to_csv("../data/output/podium_analysis.csv", index=False)

#%% [markdown]
# ---
# ### Putting together podium and win analysis:
# 
# We can combine the `win_analysis` and `podium_analysis` dataframes to make web loading slightly faster (1 request vs 2 requests, no duplicate columns requested).

#%%
analysis = pd.merge(win_analysis, podium_analysis, on=["year","team"])


#%%
analysis.head()

#%% [markdown]
# Let's also add a column to be a single label for each run:

#%%
def team_run(row):
    return " ".join([row.team,str(row.year)])


#%%
analysis["run_id"] = analysis.apply(team_run, axis=1)
analysis.head()


#%%
analysis.to_csv("../data/output/win_and_podium_analysis.csv", index=False)

#%% [markdown]
# ---
# 
# ## Method 3: Race Averages and Consistency
# 
# The best podium finish a team can have is to have one of their drivers on first, and the other on second — a one-two finish. We can see who had the highest number of one-two finishes each season, but I think it's more interesting to see who overall got the closest to having a perfect season.
# 
# To figure this out, I'll introduce the idea of a race average: for each race I'll average all of the team's finishing positions. the lower the average, the better the team performed in that race. If there are two drivers in a team, then the best average is a one-two finish which is a race average of 1.5.
# 
# First let's try to see how many drivers each team had for each race.

#%%
keep_out = ["nq", "npq", "exc", "tf"]
race_entries = results[~results.position.isin(keep_out)]


#%%
grouped= race_entries.groupby(["year", "team", "round"])


#%%
grouped.driver.nunique().head(13)

#%% [markdown]
# This is a good starting point. I can go race by race and get the averages doing the same thing (with say `.p_final.mean()` instead of `driver.nunique()`.
# 
# But I also want to look at how shared drives are handled.

#%%
grouped2 = race_entries.groupby(["year", "team", "round", "driver"])


#%%
grouped2.p_final.count()

#%% [markdown]
# In the 1950 Italian GP, Juan Manuel Fangio has two records because of shared driving. When calculating race averages, we'll have to process those.
# 
# Let's try to calculate the race average for Ferrari's 1952 run:

#%%
f1_1952 = race_entries[race_entries.year == 1952]
grouped = f1_1952.groupby(["year", "team", "round", "driver"])


#%%
grouped = grouped.p_final.mean().rename("p_average")
grouped


#%%
g_drivers = grouped.to_frame().reset_index()


#%%
g_rounds = g_drivers.groupby(["year","team", "round"]).p_average.mean()
g_rounds


#%%
g_rounds = g_rounds.to_frame().reset_index()


#%%
g_team = g_rounds.groupby(["year","team"]).p_average.mean()
g_team

#%% [markdown]
# What we just computed is the average finishing position for Ferrari in 1952. 
# 
# We can generalize this process for every team and every season:
# 
# 1. group results by `["year", "team", "round", "driver"]`.  
#     1. Find the average `p_final` for each driver of each team at each round of the season.
#     1. Rename computed average to `p_average`
#     1. turn the resulting series into a dataframe.
# 1. group dataframe from previous step by `["year", "team", "round"]`
#     1. Find the average `p_average` for each team at each round of the season.
#     1. turn the resulting series into a dataframe.
# 1. group dataframe from previous step by `["year", "team"]`
#     1. Find the average `p_average` for each team of each year.
#     1. turn the resulting series into a dataframe.
# 1. Optional: group dataframe from previous step by `["year"]`
#     1. Find the average `p_average` for each year of F1.
#     1. turn resulting series into a dataframe.
# 
# Let's apply this to the `results` dataframe so we can compare the championship runs:

#%%
keep_out = ["nq", "npq", "exc", "tf"]
race_entries = results[~results.position.isin(keep_out)]


#%%
g_drivers = race_entries.groupby(["year", "team", "round", "driver"]).p_final.mean().rename("p_average").to_frame().reset_index()


#%%
g_rounds = g_drivers.groupby(["year", "team", "round"]).p_average.mean().to_frame().reset_index()


#%%
g_rounds.head(20)


#%%
g_team = g_rounds.groupby(["year", "team"]).p_average.mean().to_frame().reset_index()

#%% [markdown]
# Now we can sort `g_team` to see who had the best racing average:

#%%
g_team.sort_values(by="p_average", ascending=True).head(10)

#%% [markdown]
# I think this is good enough to compare, but I want to check what the perfect performance would have been for each season. We can do this similarly to how we counted available podium spots:
# 
# 1. Get number of drivers in each race, say *n*.
# 1. Find the average of the first n spots. Append to a list
# 1. Return the average of that list of *n*'s.

#%%
race_average_analysis = g_team.copy()


#%%
def expected_perfect(row):
    season = race_entries[race_entries.year == row.year]
    team = season[season.team == row.team]
    races = team["round"].unique()
    num_races = team["round"].max()
    my_list = []
    
    for race in races:
        drivers = team[team["round"] == race].driver.nunique()
        race_finishes = []
        for i in range(1, drivers + 1):
            race_finishes.append(i)

        my_list.append(np.mean(race_finishes))
    
    best_finish = np.sum(my_list)
    
    perfect = float(best_finish)/float(num_races)
    
    return perfect


#%%
race_average_analysis["perfect"] = race_average_analysis.apply(expected_perfect, axis = 1)


#%%
race_average_analysis.head(10)


#%%
race_average_analysis["delta"] = race_average_analysis["p_average"] - race_average_analysis["perfect"]


#%%
race_average_analysis.sort_values(by="delta").head(10)

#%% [markdown]
# To this, let's add variance, and standard deviation for plotting error:

#%%
def compute_std(row):
    season = g_rounds[g_rounds.year == row.year]
    run = season[season.team == row.team]
    return run.p_average.std()

def compute_var(row):
    season = g_rounds[g_rounds.year == row.year]
    run = season[season.team == row.team]
    return run.p_average.var()


#%%
race_average_analysis["std"] = race_average_analysis.apply(compute_std, axis=1)
race_average_analysis["var"] = race_average_analysis.apply(compute_var, axis=1)


#%%
race_average_analysis.sort_values(by="p_average").head(10)

#%% [markdown]
# We can now save this to a csv and move on to doing the same but for all the teams in every season.

#%%
race_average_analysis.to_csv("../data/output/race_average_analysis.csv", index=False)

#%% [markdown]
# Like we did earlier, we can add columns from this analysis into an overall analysis dataFrame:

#%%
overall_analysis = pd.merge(analysis, race_average_analysis, on=["year","team"])
overall_analysis.head()


#%%
overall_analysis.to_csv("../data/output/overall_analysis.csv", index=False)

#%% [markdown]
# ---
# 
# ### Do race average analysis for all races

#%%
keep_out = ["nq", "npq", "exc", "tf"]
entries = race_results[~race_results.position.isin(keep_out)]


#%%
g_d = entries.groupby(["year", "team", "round", "driver"]).p_final.mean().rename("p_average").to_frame().reset_index()


#%%
g_d.to_csv("../data/output/race_averages_drivers.csv",index=False)


#%%
g_r = g_d.groupby(["year", "team", "round"]).p_average.mean().to_frame().reset_index()


#%%
g_r.to_csv("../data/output/race_averages_rounds.csv",index=False)


#%%
g_t = g_r.groupby(["year", "team"]).p_average.mean().to_frame().reset_index()


#%%
g_t.to_csv("../data/output/race_averages_team.csv",index=False)


#%%
g_year = g_t.groupby(["year"]).p_average.mean().to_frame().reset_index()


#%%
g_year.to_csv("../data/output/race_averages_year.csv",index=False)


#%%



