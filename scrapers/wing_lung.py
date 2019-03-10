###########################################################
## A python program scraping Wing Lung Bank ATM data
###########################################################
## Author: WONG, Wing Kam (@wingkwong)
## License: MIT
## Version: 0.1.0
## Maintainer: @wingkwong
###########################################################

import requests
import json
import pandas as pd
from bs4 import BeautifulSoup

# Defining variables
URL = 'https://www.winglungbank.com/wlb_corporate/en/about-us/service-guide/contact-us/atm-and-branches/atm-and-branches-hong-kong.html'
COLUMNS = [
    'district', 'address', 'tel', 'atm', 'atm_with_rmb', 'atm_cash_deposit',
    'atm_cheque_deposit'
]

# Initializing final data frame
df = pd.DataFrame()
df_atm = pd.DataFrame()
df_tmp_atm = []
df_tmp_atm_with_rmb = []
df_tmp_atm_cash_deposit = []
df_tmp_atm_cheque_deposit = []

# Fetching html page from China Wing Lung Bank
req = requests.get(URL)
soup = BeautifulSoup(req.content, 'html.parser')

blocks = soup.find_all('div', {'class': 'inner-content_branch-district'})
for block in blocks:
    df_tmp = pd.DataFrame()
    lists = block.find('ul')
    divs = lists.find_all('div')
    districts = lists.find_all('div',
                               {'class': 'inner-content_branch-header-region'})
    addresses = lists.find_all('div',
                               {'class': 'inner-content_branch-header-addr'})
    tels = lists.find_all('div', {'class': 'inner-content_branch-header-tel'})
    facilities = lists.find_all(
        'div', {'class': 'inner-content_branch-header-facilities'})

    district = [
        districts.text.replace('\n', '').replace('\t', '').replace(
            '                                             ', ' ').rstrip()
        for districts in districts
    ]
    address = [address.text for address in addresses]
    tel = [tel.text for tel in tels]

    for f in facilities:
        spans = f.find_all('span')
        atm = 'N'
        atm_with_rmb = 'N'
        atm_cash_deposit = 'N'
        atm_cheque_deposit = 'N'

        for span in spans:
            if 'inner-content_branch-atm-icon' in span['class']:
                atm = 'Y'
            if 'inner-content_branch-atm-with-rmb-withdrawal-icon' in span[
                    'class']:
                atm_with_rmb = 'Y'

            if 'inner-content_branch-atm-csh' in span['class']:
                atm_cash_deposit = 'Y'

            if 'inner-content_branch-atm-chq' in span['class']:
                atm_cheque_deposit = 'Y'

        if atm == 'Y':
            df_tmp_atm.append('Y')
        else:
            df_tmp_atm.append('N')

        if atm_with_rmb == 'Y':
            df_tmp_atm_with_rmb.append('Y')
        else:
            df_tmp_atm_with_rmb.append('N')

        if atm_cash_deposit == 'Y':
            df_tmp_atm_cash_deposit.append('Y')
        else:
            df_tmp_atm_cash_deposit.append('N')

        if atm_cheque_deposit == 'Y':
            df_tmp_atm_cheque_deposit.append('Y')
        else:
            df_tmp_atm_cheque_deposit.append('N')

    df_tmp['district'] = district
    df_tmp['address'] = address
    df_tmp['tel'] = tel
    df = df.append(df_tmp, ignore_index=True)

df_atm['atm'] = df_tmp_atm
df_atm['atm_with_rmb'] = df_tmp_atm_with_rmb
df_atm['atm_cash_deposit'] = df_tmp_atm_cash_deposit
df_atm['atm_cheque_deposit'] = df_tmp_atm_cheque_deposit

# Merging data frames
df = pd.concat([df, df_atm], axis=1)

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/wing_lung.csv', encoding='utf-8', index=False)
