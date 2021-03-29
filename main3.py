import numpy as np
import pandas as pd

data = pd.read_csv("data/video_games.csv")


no_dupe_data = data.groupby(["Name","Year"], as_index = False)["Global_Sales"].sum()

print(no_dupe_data)


no_dupe_data.to_csv("data/no_dupe_video_games_genre.csv")
