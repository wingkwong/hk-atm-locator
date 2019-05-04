###########################################################
## A python program scraping Shanghai Commercial Bank ATM data
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
URL = 'https://www.shacombank.com.hk/eng/main/atm_outlets_json.jsp?search=&country=Hong%20Kong'

###########################################################
## TODO
###########################################################
## 1. Handle column 'openingHours'
## 2. Handle duplicate records (only type is different)
###########################################################
COLUMNS = [
    'id', 'name', 'address', 'lat', 'lng', 'tel', 'fax'
]

# Fetching data from HKBEA
req = requests.get(URL)

# Decoding JSON data
data = json.loads(req.content)

# Normalizing JSON data
df = json_normalize(data, 'outlets')

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/sha_com_bank.csv', encoding='utf-8', index=False)
