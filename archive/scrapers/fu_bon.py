###########################################################
## A python program scraping Fubon Bank (Hong Kong) ATM data
###########################################################
## Author: WONG, Wing Kam (@wingkwong)
## License: MIT
## Version: 0.1.0
## Maintainer: @wingkwong
###########################################################

import requests
import json
import pandas as pd
from bs4 import BeautifulSoup
from pandas.io.json import json_normalize

# Defining variables
URL = 'https://www.fubonbank.com.hk/json/branch_locator_en.json'
COLUMNS = [
    'address', 'cat', 'displaybox', 'district', 'lat', 'lng', 'name', 'openId',
    'type', 'telephone', 'mon_to_fri', 'sat', 'sat_sun_ph'
]

# Initializing final data frame
df = pd.DataFrame()

# Fetching data from Fubon Bank (Hong Kong)
req = requests.get(URL)

# Decoding JSON data
data = json.loads(req.content)

# Normalizing JSON data
df = json_normalize(data, 'pins')

# Extract popupDetails
popupDetails = df['popupDetails']
df_detail = pd.DataFrame()
for popupDetail in popupDetails:
    df_tmp_tel = []
    df_tmp_mon_to_fri = []
    df_tmp_sat = []
    df_tmp_sat_sun_ph = []
    df_tmp = pd.DataFrame()

    soup = BeautifulSoup(popupDetail, "html.parser")
    strong_tags = soup.find_all('strong')
    strong_tags_len = len(strong_tags)
    for idx, strong_tag in enumerate(strong_tags):
        if idx == 1:
            # Skiping header
            continue
        next_tags = strong_tag.find_next('p')
        val = next_tags.text
        if idx == 0:
            df_tmp_tel.append(val)
        if idx == 2:
            df_tmp_mon_to_fri.append(val)
        if idx == 3:
            if strong_tags_len == 5:
                df_tmp_sat.append(val)
            else:
                df_tmp_sat.append('N/A')
                df_tmp_sat_sun_ph.append(val)
        if strong_tags_len == 5 and idx == 4:
            df_tmp_sat_sun_ph.append(val)

    df_tmp['telephone'] = df_tmp_tel
    df_tmp['mon_to_fri'] = df_tmp_mon_to_fri
    df_tmp['sat'] = df_tmp_sat
    df_tmp['sat_sun_ph'] = df_tmp_sat_sun_ph
    df_detail = df_detail.append(df_tmp, ignore_index=True)

# Merging data frames
df = pd.concat([df, df_detail], axis=1)

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/fu_bon.csv', encoding='utf-8', index=False)
