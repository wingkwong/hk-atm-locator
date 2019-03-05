###########################################################
## A python program scraping Public Bank (Hong Kong) ATM data
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
URL = 'https://www.publicbank.com.hk/en/about_us/branch_network'
COLUMNS = [
    'branch', 'address', 'phone', 'fax', 'atm', 'region', 'monday_to_friday',
    'saturday'
]

# Fetching html page from Public Bank (Hong Kong)
req = requests.get(URL)
soup = BeautifulSoup(req.content, 'html.parser')

# Selecting block for each region
hong_kong = soup.find('div', {'class': 'branch-list-wrapper-1'})
kowloon = soup.find('div', {'class': 'branch-list-wrapper-2'})
new_territories = soup.find('div', {'class': 'branch-list-wrapper-3'})

# Initializing final data frame
df = pd.DataFrame()

# Preparing region list
regions = []
regions_index = ['Hong Kong', 'Kowloon', 'New Territories']
regions.append(hong_kong)
regions.append(kowloon)
regions.append(new_territories)

for idx, region in enumerate(regions):
    trs = region.find_all('tr')

    # temp df lists
    df_branch = []
    df_address = []
    df_phone = []
    df_fax = []
    df_atm = []
    df_monday_to_friday = []
    df_saturday = []
    df_tmp = pd.DataFrame()

    # skipping header row
    trs = iter(trs)
    next(trs, None)

    for tr in trs:
        # Branch
        branches = tr.select("td:nth-of-type(1)")
        if (branches):
            df_branch.append(branches[0].text)

        # Address
        addresses = tr.select("td:nth-of-type(2)")
        if (addresses):
            df_address.append(addresses[0].text)

        # Phone
        phones = tr.select("td:nth-of-type(3)")
        if (phones):
            df_phone.append(phones[0].text)

        # Fax
        faxes = tr.select("td:nth-of-type(4)")
        if (faxes):
            df_fax.append(faxes[0].text)

        # ATM
        atm = tr.select("td:nth-of-type(5)")
        if (atm):
            src = atm[0].find('img')['src']
            if 'atm.png' in src:
                df_atm.append('Y')
            else:
                df_atm.append('N')

        # Opening hour - Monday to Friday
        df_monday_to_friday.append('9:00a.m. to 5:30p.m.')

        # Opening hour - Saturday
        if branches and branches[0].text == 'Wanchai Commercial Centre':
            df_saturday.append('N/A')
        else:
            df_saturday.append('9:00a.m. to 1:00p.m.')

    df_tmp['branch'] = df_branch
    df_tmp['address'] = df_address
    df_tmp['phone'] = df_phone
    df_tmp['fax'] = df_fax
    df_tmp['atm'] = df_atm
    df_tmp['region'] = regions_index[idx]
    df_tmp['monday_to_friday'] = df_monday_to_friday
    df_tmp['saturday'] = df_saturday
    df = df.append(df_tmp, ignore_index=True)

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/public_bank.csv', encoding='utf-8', index=False)
