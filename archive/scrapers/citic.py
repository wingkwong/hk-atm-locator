###########################################################
## A python program scraping China CITIC Bank International ATM data
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
URL = 'https://www.cncbinternational.com/contact-us/branches/en/index.jsp'
COLUMNS = [
    'branch', 'address', 'cheque_drop_box', 'atm', 'safe_deposit_box', 'first_banking_centre', 'region'
]

# Fetching html page from China CITIC Bank International
req = requests.get(URL)
soup = BeautifulSoup(req.content, 'html.parser')

# Selecting block for each region 
hong_kong = soup.find_all('div', {'class': 'cs53a'})[0]
kowloon = soup.find_all('div', {'class': 'cs53a'})[1]
new_territories = soup.find_all('div', {'class': 'cs53a'})[2]

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
    df_cheque_drop_box = []
    df_atm = []
    df_safe_deposit_box = []
    df_first_banking_centre = []
    df_branch = []
    df_address = []
    df_tmp = pd.DataFrame()

    branches = region.find_all('td', {'class': 'cs53Cell01'})
    df_branch = [branch.text for branch in branches]

    addresses = region.find_all('td', {'class': 'cs53Cell02'})
    df_address = [address.text for address in addresses]

    for tr in trs:
        # Cheque Drop Box
        cheque_drop_boxes = tr.select("td:nth-of-type(3) span")
        if(cheque_drop_boxes):
            df_cheque_drop_box.append([cheque_drop_box.text for cheque_drop_box in cheque_drop_boxes][0])

        # ATM
        atms = tr.select("td:nth-of-type(4) span")  
        if(atms):
            df_atm.append([atm.text for atm in atms][0])

        # Safe Deposit Box
        safe_deposit_boxes = tr.select("td:nth-of-type(5) span")  
        if(safe_deposit_boxes):
            df_safe_deposit_box.append([safe_deposit_box.text for safe_deposit_box in safe_deposit_boxes][0])
        
        # CITIC first Banking Centre
        first_banking_centres = tr.select("td:nth-of-type(6) span")  
        if(first_banking_centres):
            df_first_banking_centre.append([first_banking_centre.text for first_banking_centre in first_banking_centres][0])

    df_tmp['branch'] = df_branch
    df_tmp['address'] = df_address
    df_tmp['cheque_drop_box'] = df_cheque_drop_box
    df_tmp['atm'] = df_atm
    df_tmp['safe_deposit_box'] = df_safe_deposit_box
    df_tmp['first_banking_centre'] = df_first_banking_centre
    df_tmp['region'] = regions_index[idx]
    df = df.append(df_tmp, ignore_index=True)

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/citic.csv', encoding='utf-8', index=False)
