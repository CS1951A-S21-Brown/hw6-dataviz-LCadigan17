import numpy as np
import pandas as pd

data = pd.read_csv("data/video_games.csv")

n=7
genre_grouped = data.groupby(["Genre"])
sorted_list = []
for genre, table in genre_grouped:
    genre_sum = table["Global_Sales"].sum()
    both_grouped = table.groupby(["Publisher"], as_index = False)["Global_Sales"].sum()
    sorted_grouped = both_grouped.sort_values(by=["Global_Sales"], ascending = False)[0:5]
    sorted_grouped["Genre"]=genre
    top_pub_sum = sorted_grouped["Global_Sales"].sum()
    other_sum = genre_sum-top_pub_sum
    df2 = pd.DataFrame([["Other", other_sum,genre]], columns=["Publisher","Global_Sales","Genre"])
    sorted_grouped = sorted_grouped.append(df2, ignore_index=True)
    sorted_list += [sorted_grouped]        
result = pd.concat(sorted_list)
result.to_csv("data/video_games_genre.csv")
