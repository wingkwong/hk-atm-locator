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
## 2. Column 'services', 'postalCode', 'placeId', 'city' are not included at this moment
###########################################################
COLUMNS = [
    'id', 'name', 'address', 'is-24-hours', 'status', 'telephone', 'types', 'latitude', 'longitude'
]

# Fetching data from Standard Chartered Hong Kong
req = requests.get(URL)

# Decoding JSON data
data = json.loads(req.content)

# Normalizing JSON data
df = json_normalize(data, 'locations')

# Filtering out other types
condition = pd.Series(df['types']).str.contains('atm', regex=False)
df = df.loc[condition]
df['types'] = [types[0] for types in df['types']]

# Retrieving address values
address_values = pd.Series(df['address']).values

# Adding Latitude
df['latitude'] = [d.get('latitude') for d in address_values]

# Adding Longitude
df['longitude'] = [d.get('longitude') for d in address_values]

# Concatenating ['address']['addressLines']
addr_dict = [d.get('addressLines') for d in address_values]
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
