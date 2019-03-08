###########################################################
## A python program scraping Dah Sing Bank ATM data
###########################################################
## Author: WONG, Wing Kam (@wingkwong)
## License: MIT
## Version: 0.1.0
## Maintainer: @wingkwong
###########################################################

import requests
import xmltodict
import pandas as pd
import json

# Defining variables
URL = 'https://www.dahsing.com/html/shareContent/branch_atm_config.xml'
COLUMNS = [
    'AddEn', 'AddSc', 'AddTc', 'DefaultFlag', 'LocLat', 'LocLon', 'NameEn',
    'NameSc', 'NameTc', 'OpeningHours', 'Region', 'Remark', 'RemarkEn',
    'RemarkSc', 'RemarkTc', 'Services', 'Tel', 'Times'
]

# Fetching data from Dah Sing Bank
req = requests.get(URL)

# Parsing XML data
data = xmltodict.parse(req.content)
hong_kong = data['Config']['BranchATM']['Districts']['District'][0]
kowloon = data['Config']['BranchATM']['Districts']['District'][1]
new_territories = data['Config']['BranchATM']['Districts']['District'][2]

# Initializing final data frame
df = pd.DataFrame()

# Preparing region list
regions = []
regions_index = ['Hong Kong', 'Kowloon', 'New Territories']
regions.append(hong_kong)
regions.append(kowloon)
regions.append(new_territories)

for idx, region in enumerate(regions):
    df_time_tmp = []
    branches = json.loads(json.dumps(region.get('Branch', {})))

    for branch in branches:
        time = 'N/A'
        for trs in branch['Times']['Tr']:
            if isinstance(trs, dict):
                for tr in trs['Td']:
                    if isinstance(tr, dict):
                        if tr['Ico'] == "1":
                            time = tr['TextEn']
            else:
                tds = branch['Times']['Tr']['Td']
                if isinstance(tds, dict):
                    td = tds
                    if td['Ico'] == "1":
                        time = td['TextEn']
                else:
                    for td in tds:
                        if td['Ico'] == "1":
                            time = td['TextEn']
        df_time_tmp.append(time)

    df_tmp = pd.DataFrame.from_dict(branches)
    df_tmp['Times'] = df_time_tmp
    df_tmp['Region'] = regions_index[idx]
    df = df.append(df_tmp, ignore_index=True)

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/dah_sing.csv', encoding='utf-8', index=False)