# Scraping ATM data from all banks in Hong Kong

## Installing

For MacOS Users:
````
python3 -mvenv ./env
source ./env/bin/activate
pip3 install -r requirements.txt
````

For Windows Users:
````
pip3 install -U pip virtualenv
virtualenv --system-site-packages -p python3 ./venv
pip3 install -r requirements.txt
````

## Formatting code
Example:
````
yapf -i hkbea.py
````

## Running the scraper
Example:
````
python3 hkbea.py
````
## Status

---

### Complete
- China Construction Bank (Asia)
- DBS Bank (Hong Kong)
- The Bank of East Asia, Limited
- China CITIC Bank International
- Industrial and Commercial Bank of China (Asia)
- Public Bank (Hong Kong)
- Nanyang Commercial Bank
- Dah Sing Bank

### Follow-up Required
- Bank of China (Hong Kong)
- Hang Seng Bank
- Standard Chartered Hong Kong
- Shanghai Commercial Bank

### Incomplete
- Hongkong and Shanghai Banking Corporation
- Wing Lung Bank
- Bank of Communications (Hong Kong)
- OCBC Wing Hang Bank
- Tai Yau Bank
- Chiyu Banking Corporation
- Chong Hing Bank
- Tai Sang Bank Limited
- Fubon Bank (Hong Kong)
- Citibank (Hong Kong)