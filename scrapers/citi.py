###########################################################
## A python program scraping Citibank (Hong Kong) ATM data
###########################################################
## Author: WONG, Wing Kam (@wingkwong)
## License: MIT
## Version: 0.1.0
## Maintainer: @wingkwong
###########################################################

import requests
from bs4 import BeautifulSoup
import pandas as pd

# Defining variables
URL = 'https://www.citibank.com.hk/global_docs/english/locations/atm/index.html'
COLUMNS = ['address', 'region']

# Initializing final data frame
df = pd.DataFrame()

# Fetching html page from Citibank (Hong Kong)
req = requests.get(URL)
soup = BeautifulSoup(req.content, 'html.parser')

addr_cnt = [[6, 1, 2, 4, 1, 1, 1, 1, 1], [2, 1, 1, 2, 2, 4, 1],
            [2, 1, 3, 1, 6, 1, 2], [2]]

regions = soup.find_all('div', {'class': 'showHideArea'})
for i, region in enumerate(regions):
    df_tmp = pd.DataFrame()
    df_address = []
    df_region = []
    addresses = []

    atm_regions = [region.text for region in region.select('.whiteBg strong')]
    tds = region.select('.grayBg td')
    for td in tds:
        if isinstance(td.text, str) and td.text != 'Address':
            addresses.append(
                td.text.replace('\n', '').replace('\t', '').strip())
    addresses = list(filter(None, addresses))

    j = 0
    k = 0
    for address in addresses:
        if j < addr_cnt[i][k]:
            df_address.append(address)
            df_region.append(atm_regions[k])
            j = j + 1
        else:
            j = 0
            k = k + 1

    df_tmp['address'] = df_address
    df_tmp['region'] = df_region
    df = df.append(df_tmp, ignore_index=True)

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/citi.csv', encoding='utf-8', index=False)
