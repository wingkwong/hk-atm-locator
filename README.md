# Hong Kong Automated Teller Machine (ATM) Locator
Centralising Automated Teller Machine (ATM) Data in Hong Kong

### Project Synopsis

There are 22 licensed banks in Hong Kong and each provides ATM locator info on their official website. However, gathering all ATM data is frustrating as there is no a standardised format and some of the data are unstructured. This project aims to centralise Hong Kong ATM data in a well-defined yet common format and release APIs for other usages.

Hong Kong Monetary Authority (HKMA) will provide APIs for retrieving ATM information (The release date is still unknown). Based on [Open API Framework for the Hong Kong Banking Sector](https://www.hkma.gov.hk/media/eng/doc/key-information/press-release/2018/20180718e5a2.pdf), no standardised open API functions will be provided at the first release.

Paragraph #20
> Throughout the discussion and consultation period, the HKMA recognises the industry’s desire to see a common set of Open APIs for better interoperability. However, a number of international banks operating in Hong Kong have already implemented their group standard for implementing Open APIs at global or regional levels, and have demonstrated elsewhere that requiring banks to adhere to a prescribed set of standardised Open API functions is challenging.

Paragraph #21
> Some opinions from the technology sector also indicate that it would be more desirable for banks to quickly offer Open APIs than to wait for standardised Open APIs that would take time to emerge. Furthermore, it is believed that once an ecosystem has been developed and becomes mature, convergence to standardised Open APIs will likely occur in response to the needs of the market.

Each bank will implement their own standards and there is no single API endpoint which will be provided. Besides, the request only take geographic locations optionally. This design is not flexible enough.

---

## Project Roadmap

### Phrase I (In Progress)
* Scrape all ATM data from below-mentioned banks for further analysis. 
(P.S. JETCO provides standardised ATM data for most banks distributed in several XML files. However, the data is not guaranteed to be the latest one.) 

### Phrase II
* Define a standardised schema for ATM data for all banks 
* Develop a program to convert existing data to a desired format

### Phrase III
* Define API Specification
* Build APIs

### Phrase IV
* Upload the final dataset to Google Map
* Develop a web portal (TBC)

---

## Licensed Banks Incorporated in Hong Kong
| Clearing Code 	| Bank Name                                      	| Chinese Name                   	|
|---------------	|------------------------------------------------	|--------------------------------	|
| 003           	| Standard Chartered Hong Kong                   	| 渣打銀行(香港)有限公司         	|
| 004           	| Hongkong and Shanghai Banking Corporation      	| 香港上海滙豐銀行有限公司       	|
| 009           	| China Construction Bank (Asia)                 	| 中國建設銀行(亞洲)股份有限公司 	|
| 012           	| Bank of China (Hong Kong)                      	| 中國銀行(香港)有限公司         	|
| 015           	| The Bank of East Asia, Limited                 	| 東亞銀行有限公司               	|
| 016           	| DBS Bank (Hong Kong)                           	| 星展銀行(香港)有限公司         	|
| 018           	| China CITIC Bank International                 	| 中信銀行國際有限公司           	|
| 020           	| Wing Lung Bank                                 	| 永隆銀行有限公司               	|
| 024           	| Hang Seng Bank                                 	| 恒生銀行有限公司               	|
| 025           	| Shanghai Commercial Bank                       	| 上海商業銀行有限公司           	|
| 027           	| Bank of Communications (Hong Kong)             	| 交通銀行(香港)有限公司         	|
| 028           	| Public Bank (Hong Kong)                        	| 大眾銀行(香港)有限公司         	|
| 035           	| OCBC Wing Hang Bank                            	| 華僑永亨銀行有限公司           	|
| 038           	| Tai Yau Bank                                   	| 大有銀行有限公司               	|
| 039           	| Chiyu Banking Corporation                      	| 集友銀行有限公司               	|
| 040           	| Dah Sing Bank                                  	| 大新銀行有限公司               	|
| 041           	| Chong Hing Bank                                	| 創興銀行有限公司               	|
| 043           	| Nanyang Commercial Bank                        	| 南洋商業銀行有限公司           	|
| 061           	| Tai Sang Bank Limited                          	| 大生銀行有限公司               	|
| 072           	| Industrial and Commercial Bank of China (Asia) 	| 中國工商銀行(亞洲)有限公司     	|
| 128           	| Fubon Bank (Hong Kong)                         	| 富邦銀行(香港)有限公司         	|
| 250           	| Citibank (Hong Kong)                           	| 花旗銀行(香港)有限公司         	|