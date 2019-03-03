###########################################################
## A python program scraping China Construction Bank (Asia) ATM data
###########################################################
## Author: WONG, Wing Kam (@wingkwong)
## License: MIT
## Version: 0.1.0
## Maintainer: @wingkwong
###########################################################

import requests
import xmltodict
import pandas as pd

# Defining variables
URL = 'http://www.asia.ccb.com/hongkong/personal/map_note.xml'
COLUMNS = [
    'title', 'address', 'longitude', 'latitude', 'phone', 'time', 'disabled',
    'location'
]

# Fetching data from HKBEA
req = requests.get(URL)

# Parsing XML data
data = xmltodict.parse(req.content)
data = list(data.values())[0]

# Hong Kong Island
df1 = pd.DataFrame()
df1['title'] = data['title1']
df1['longitude'] = data['pointLeft1']
df1['latitude'] = data['pointRight1']
df1['phone'] = data['phone1']
df1['time'] = data['time1']
df1['disabled'] = data['disabled1']
df1['location'] = 'Hong Kong Island'

# Kowloon
df2 = pd.DataFrame()
df2['title'] = data['title2']
df2['pointLeft'] = data['pointLeft2']
df2['pointRight'] = data['pointRight2']
df2['phone'] = data['phone2']
df2['time'] = data['time2']
df2['disabled'] = data['disabled2']
df2['location'] = 'Kowloon'

# New Territories
df3 = pd.DataFrame()
df3['title'] = data['title3']
df3['pointLeft'] = data['pointLeft3']
df3['pointRight'] = data['pointRight3']
df3['phone'] = data['phone3']
df3['time'] = data['time3']
df3['disabled'] = data['disabled3']
df3['location'] = 'New Territories'

# Concatenating data from three locations
df = pd.concat([df1, df2, df3], axis=0, ignore_index=True)

# Writing the result to data folder
df.to_csv('../data/ccb.csv', encoding='utf-8', index=False)
