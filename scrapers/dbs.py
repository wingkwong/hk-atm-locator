###########################################################
## A python program scraping DBS Bank (Hong Kong) ATM data
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
URL = 'https://www.dbs.com.hk/iwov-resources/scripts/maps/data-en.js'
COLUMNS = [
    'country', 'branchId', 'language', 'type', 'name', 'address',
    'postal_code', 'tel', 'fax', 'latitude', 'longitude', 'operatingHours',
    'SMSQ', 'QCAMURL'
]

# Fetching data from DBS
req = requests.get(URL)

# Parsing JavaScript text and storing variable branchList to jsonValue
branchList = re.findall(r'var branchList.*?=\s*(.*?);', req.text,
                        re.DOTALL | re.MULTILINE)
jsonValue = json.loads(branchList[0])

# Creating Data Frame
df = pd.DataFrame(jsonValue)

# Filtering out other types
condition = pd.Series(df['type']).str.contains('ATM', regex=False)
df = df.loc[condition]

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/dbs.csv', encoding='utf-8', index=False)
