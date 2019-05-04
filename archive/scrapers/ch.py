###########################################################
## A python program scraping Chong Hing Bank ATM data
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
URL_HK = 'http://www.chbank.com/en/personal/service-channels/atm-network/index.shtml'
URL_KL = 'http://www.chbank.com/en/personal/service-channels/atm-network/kowloon.shtml'
URL_NT = 'http://www.chbank.com/en/personal/service-channels/atm-network/new-territories.shtml'
COLUMNS = ['branch', 'address', 'district']
regions = ['Hong Kong', 'Kowloon', 'New Terroritories']
urls = []
urls.append(URL_HK)
urls.append(URL_KL)
urls.append(URL_NT)

# Initializing final data frame
df = pd.DataFrame()

# Fetching html page from Chong Hing Bank
for url in urls:
    req = requests.get(url)
    soup = BeautifulSoup(req.content, 'html.parser')

    table_container = soup.find_all('div', {'class': 'tabInnerbg'})[0]
    tables = table_container.find_all('table')
    districts = [
        table.text for table in table_container.find_all(
            'div', {'class': 'generalTableTitleFirst'})
    ]

    # Initializing tmp data frame
    df_tmp = pd.DataFrame()
    df_branch = []
    df_address = []
    df_district = []

    for i, table in enumerate(tables):
        trs = table.find_all('tr')
        for j, tr in enumerate(trs):
            # Skipping first 2 rows
            if (j > 1):
                tds = tr.find_all('td')
                branch = tds[0].text
                address = tds[1].text

                df_branch.append(branch)
                df_address.append(address)
                df_district.append(districts[i])

    df_tmp['branch'] = df_branch
    df_tmp['address'] = df_address
    df_tmp['district'] = df_district
    df = df.append(df_tmp, ignore_index=True)

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/ch.csv', encoding='utf-8', index=False)
