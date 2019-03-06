###########################################################
## A python program scraping Nanyang Commercial Bank ATM data
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
URL = 'https://www.ncb.com.hk/nanyang_bank/eng/html/1123.html'
COLUMNS = [
    'branch', 'address', 'phone', 'region', '24_hours', 'monday_to_friday',
    'saturday', 'sunday_and_public_holiday'
]

# Initializing final data frame
df = pd.DataFrame()

# temp df lists
df_branch = []
df_address = []
df_phone = []
df_region = []
df_24_hours = []
df_monday_to_friday = []
df_saturday = []
df_sunday_and_public_holiday = []

# Regions
regions = ['Hong Kong', 'Kowloon', 'New Territories']
current_regions_idx = -1

# Fetching html page from Nanyang Commercial Bank
req = requests.get(URL)
soup = BeautifulSoup(req.content, 'html.parser')

# Selecting block for each region
table = soup.find('table', {'class': 'table0'})
trs = table.select('tr')

for tr in trs:
    tds = tr.find_all('td')
    if len(tds) == 0 and current_regions_idx < 2:
        current_regions_idx = current_regions_idx + 1
    if len(tds) == 4:
        for idx, td in enumerate(tds):
            # idx == 0
            # Col #0 for icons. Not being used.
            if (idx == 1):
                df_branch.append(td.text.replace(':', ''))

                # Special case
                if td.text.replace(' :', '') == 'Central District Branch':
                    df_monday_to_friday.append('09:00 - 17:00')
                    df_saturday.append('09:00 - 13:00')
                    df_sunday_and_public_holiday.append('Closed')
                    df_24_hours.append('N')
                else:
                    df_monday_to_friday.append('N/A')
                    df_saturday.append('N/A')
                    df_sunday_and_public_holiday.append('N/A')
                    df_24_hours.append('Y')
            if (idx == 2):
                df_address.append(td.text)
            if (idx == 3):
                df_phone.append(td.text)

        df_region.append(regions[current_regions_idx])

df['branch'] = df_branch
df['address'] = df_address
df['phone'] = df_phone
df['region'] = df_region
df['24_hours'] = df_24_hours
df['monday_to_friday'] = df_monday_to_friday
df['saturday'] = df_saturday
df['sunday_and_public_holiday'] = df_sunday_and_public_holiday

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/ncb.csv', encoding='utf-8', index=False)
