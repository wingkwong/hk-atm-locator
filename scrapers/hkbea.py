###########################################################
## A python program scraping HKBEA ATM data
###########################################################
## Author: WONG, Wing Kam (@wingkwong)
## License: MIT
## Version: 0.1.0
## Maintainer: @wingkwong
###########################################################

import requests
import json
import pandas as pd
from pandas.io.json import json_normalize

# Defining variables
URL = 'https://www.hkbea.com/xml/en/hk-atm-list.txt'
COLUMNS = [
    'id', 'CountryID', 'City', 'DistrictID', 'District', 'Name', 'Addr',
    'Remark', 'InstantCashDeposit', 'RMBCashWithrawal', 'ChequeDeposit',
    'PassbookUpdate', 'BarrierFree', 'ATM1', 'ATM2', 'ATM3', 'ATM4', 'ATM5',
    'ATM6', 'ATM7', 'ATM8', 'ATM9', 'ATM10', 'lat', 'lng'
]

# Fetching data from HKBEA
req = requests.get(URL)

# Decoding JSON data
data = json.loads(req.content)

# Normalizing JSON data
df = json_normalize(data, 'branches')

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/hkbea.csv', encoding='utf-8', index=False)
