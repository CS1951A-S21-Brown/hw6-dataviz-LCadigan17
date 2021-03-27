import numpy as np
import pandas as pd


#return_data = data.groupby(["Genre","Publisher"], as_index =False)["Global_Sales"].sum()
#sum_data = data.groupby(["Genre"])["Global_Sales"].sum()
#return_data["genre_percent"] = return_data.apply(lambda row: row["Global_Sales"] / sum_data[row["Genre"]], axis = 1)


data = pd.read_csv("data/video_games.csv")
#print(grouped_data)
#for idx in grouped_data.index:
#    print(idx)
#    print(grouped_data[idx])
#return_data = return_data.sort_values(by=["Genre","Global_Sales"],ascending=False)
#print(return_data)


n=6
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
    print(genre)
result = pd.concat(sorted_list)
#result.to_csv("data/video_games_genre.csv")
