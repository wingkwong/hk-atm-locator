###########################################################
## A python program scraping Hang Seng Bank ATM data
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
URL = 'https://www.hangseng.com/en-hk/contact-us/branch-addresses.data.getjson.js'
COLUMNS = [
    'ACOP', 'ATM', 'ATMFCM', 'ATMRMB', 'Address', 'CDM', 'CHQ', 'CHQCUT', 'CS',
    'Code', 'Disable', 'HourAMB', 'HourRemark', 'HourSat', 'HourSun',
    'HourWeekdays', 'Name', 'Outlet', 'SDB', 'SEC', 'SubDistrict', 'WM'
]

# Fetching data from Hang Seng Bank
req = requests.get(URL)

# Parsing JavaScript text and storing variable branchList to jsonValue
jsonValue = json.loads(req.text)

# Creating Data Frame
df = pd.DataFrame(jsonValue['Branch'])

# Filtering out other types
condition = pd.Series(df['ATM'])
df = df.loc[condition]

###########################################################
## TODO
###########################################################
## 1. Map "SubDistrict" with the one in DistrictGroup//District//SubDistricts
###########################################################

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/hangseng.csv', encoding='utf-8', index=False)
