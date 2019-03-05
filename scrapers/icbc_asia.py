###########################################################
## A python program scraping Industrial and Commercial Bank of China (Asia) ATM data
###########################################################
## Author: WONG, Wing Kam (@wingkwong)
## License: MIT
## Version: 0.1.0
## Maintainer: @wingkwong
###########################################################

import requests
import json
import pandas as pd
import re

# Defining variables
URL = 'https://www.icbcasia.com/ICBC/%E6%B5%B7%E5%A4%96%E5%88%86%E8%A1%8C/%E5%B7%A5%E9%93%B6%E4%BA%9A%E6%B4%B2/EN/About_Us/Contact_Us/Self_Service_Banking_Centre_and_ATM/default.htm'
COLUMNS = [
    'title','latitude','longitude','txt','link','index_number','region'
]
regions = []
regions_idx = ['Hong Kong', 'Kowloon', 'New Territories']
df = pd.DataFrame()

# Fetching data from Industrial and Commercial Bank of China (Asia)
req = requests.get(URL)

# Extracting JavaScript text and storing to variables
hong_kong_data = re.findall(r'var hongKongData.*?=\s*(.*?)];', req.text,re.DOTALL | re.MULTILINE)
kowloon_data = re.findall(r'var kowloonData.*?=\s*(.*?)];', req.text,re.DOTALL | re.MULTILINE)
nt_Data = re.findall(r'var ntData.*?=\s*(.*?)];', req.text,re.DOTALL | re.MULTILINE)

regions.append(hong_kong_data)
regions.append(kowloon_data)
regions.append(nt_Data)

for regionIdx, region in enumerate(regions):
    # initializing data frame variables
    df_title = []
    df_latitude = []
    df_longitude = []
    df_txt = []
    df_link = []
    df_index_number = []
    df_tmp = pd.DataFrame()

    region= region[0][1:]
    region = ' '.join(region.split())
    region = region.replace(']', ']@@').split('@@')

    for idx, data in enumerate(region):
        data = data.strip()
        if data != '':
            data = data.replace(', [ ', '').replace(']', '')
            data = data.replace("'", '@@').split('@@')
            
            for idx, d in enumerate(data):
                striped_data = d.strip()
                if striped_data != '':
                    if idx == 1:
                        df_title.append(striped_data)
                    if idx == 2:
                        df_latitude.append(striped_data.split(',')[1])
                        df_longitude.append(striped_data.split(',')[2])
                    if idx == 3:
                        df_txt.append(striped_data)
                    if idx == 4:
                        df_link.append(striped_data.split(',')[1])
                    if idx == 5:
                        df_index_number.append(striped_data)

    df_tmp['title'] = df_title 
    df_tmp['latitude'] =df_latitude 
    df_tmp['longitude'] =df_longitude 
    df_tmp['txt'] =df_txt 
    df_tmp['link'] =df_link 
    df_tmp['index_number'] = df_index_number 
    df_tmp['region'] = regions_idx[regionIdx]
    df = df.append(df_tmp)

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/icbc_asia.csv', encoding='utf-8', index=False)
