###########################################################
## A python program scraping JETCO ATM data
###########################################################
## Author: WONG, Wing Kam (@wingkwong)
## License: MIT
## Version: 0.1.0
## Maintainer: @wingkwong
###########################################################

import requests
import xmltodict
import json

# Defining variables
languages = ['en', 'tc']
area_ids = [1, 2, 3, 4]
district_ids = list(range(1, 71)) + [160, 163, 164]
service_ids = [0, 1, 2, 3, 4, 5, 6, 7, 575, 584, 585]

for l in languages:
    for x in area_ids:
        for y in district_ids:
            for z in service_ids:
                url = 'https://www.jetco.com.hk/xml/<LANGUAGE>/atm/2_<AREA_ID>_<DISTRICT_ID>_<SERVICE_ID>_atmDetails.xml'
                url = url.replace('<LANGUAGE>', l)
                url = url.replace('<AREA_ID>', str(x))
                url = url.replace('<DISTRICT_ID>', str(y))
                url = url.replace('<SERVICE_ID>', str(z))

                # Fetching data from JETCO
                req = requests.get(url)

                if req.ok:
                    # Parsing XML data
                    data = xmltodict.parse(req.content)

                    output = './output/jetco/<LANGUAGE>/jetco_2_<AREA_ID>_<DISTRICT_ID>_<SERVICE_ID>.json'
                    output = output.replace('<LANGUAGE>', l)
                    output = output.replace('<AREA_ID>', str(x))
                    output = output.replace('<DISTRICT_ID>', str(y))
                    output = output.replace('<SERVICE_ID>', str(z))

                    with open(output, 'w', encoding='utf-8') as f:
                        json.dump(data, f, ensure_ascii=False)
