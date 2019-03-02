###########################################################
## A python program scraping Standard Chartered Hong Kong ATM data
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
URL = 'https://www.sc.com/hk/data/atm-branch/v2/all-atms-branches.json'

###########################################################
## TODO
###########################################################
## 1. Handle column 'regularHours'
## 2. Column 'services' is not included at this moment
###########################################################
COLUMNS = [
    'id', 'name', 'address', 'is-24-hours', 'status', 'telephone', 'types'
]

# Fetching data from HKBEA
req = requests.get(URL)

# Decoding JSON data
data = json.loads(req.content)

# Normalizing JSON data
df = json_normalize(data, 'locations')

# Filtering out other types
condition = pd.Series(df['types']).str.contains('atm', regex=False)
df = df.loc[condition]
df['types'] = [types[0] for types in df['types']]

# Concatenating ['address']['addressLines']
address = pd.Series(df['address']).values
addr_dict = [d.get('addressLines') for d in address]
concat_addr = [', '.join(addrStr for addrStr in addr) for addr in addr_dict]
df['address'] = concat_addr

# Concatenating telephone
df['telephone'] = [
    ', '.join(tele for tele in telephone) for telephone in df['telephone']
]

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/sc.csv', encoding='utf-8', index=False)
