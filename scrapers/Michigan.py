import requests
import json
tot_ = str()
for i in range(1,84):
    response = requests.post(f"https://mvic.sos.state.mi.us/Voter/SearchByCounty?CountyID={i}", verify=False)
    tot_ += response.text

with open("files/Michigan.html", "w") as file:
    file.write(tot_)
