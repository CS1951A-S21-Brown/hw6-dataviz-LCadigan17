import numpy as np
import pandas as pd

data = pd.read_csv("data/video_games.csv")

genre_grouped = data.groupby(["Genre"]).sum()
print(genre_grouped)
genre_grouped.to_csv("data/video_games_region_genre.csv")
