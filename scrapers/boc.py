###########################################################
## A python program scraping Bank of China (Hong Kong) ATM data
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
URL = 'https://www.bochk.com/services/xml/generatebranchweb.en.xml'
COLUMNS = [
    'code',
    'districtName',
    'districtCode'
]

# Fetching data from Bank of China (Hong Kong)
req = requests.get(URL)

# Parsing XML data
data = xmltodict.parse(req.content)
data = list(data.values())[0] 
regions = list(data['Bank']['Region'])

df = pd.DataFrame(regions)

regions = pd.Series(regions)

df['code'] = [region.get('Code') for region in regions]
df['districtName'] = [region.get('Name') for region in regions]
df['districtCode'] = [region.get('districtCode') for region in regions]

###########################################################
## TODO
###########################################################
## 1. Parse <item>
###########################################################

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/boc.csv', encoding='utf-8', index=False)