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
    'code', 'districtName', 'districtCode', 'name', 'latitude', 'longitude',
    'address', 'service'
]

# Fetching data from Bank of China (Hong Kong)
req = requests.get(URL)

# Parsing XML data
data = xmltodict.parse(req.content)
data = list(data.values())[0]
regions = list(data['Bank']['Region'])

df = pd.DataFrame()
df_code = []
df_districtName = []
df_districtCode = []
df_name = []
df_latitude = []
df_longitude = []
df_address = []
df_service = []

for region in regions:
    df_tmp = pd.DataFrame()
    code = region['Code']
    districtName = region['Name'].replace('&amp;', '&')
    districtCode = region['DistrictCode']
    items = region['item']

    for item in items:
        name = item['Name']
        latitude = item['Latitude']
        longitude = item['Longitude']
        if 'atm' in item.keys():
            address = item['atm']['Address']
            services = item['atm']['Services']
            if services is not None:
                atm_service = services['Service']
                if isinstance(atm_service, list):
                    atm_service = ','.join(atm_service)

            df_code.append(code)
            df_districtName.append(districtName)
            df_districtCode.append(districtCode)
            df_name.append(name)
            df_latitude.append(latitude)
            df_longitude.append(longitude)
            df_address.append(address)
            df_service.append(atm_service)

    df_tmp['code'] = df_code
    df_tmp['districtName'] = df_districtName
    df_tmp['districtCode'] = df_districtCode
    df_tmp['name'] = df_name
    df_tmp['latitude'] = df_latitude
    df_tmp['longitude'] = df_longitude
    df_tmp['address'] = df_address
    df_tmp['service'] = df_service
    df = df.append(df_tmp, ignore_index=True)

# Reordering columns
df = df[COLUMNS]

# Writing the result to data folder
df.to_csv('../data/boc.csv', encoding='utf-8', index=False)
