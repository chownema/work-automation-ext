# work-automation-ext

Automation application to...
- opening browsers on windows/linux/mac os
- run selenium webdriver scripts (windows only)
- run repetitous git and cli tasks used in most work places
through an express api and interacted with the postman application

Need to implement install scripts for Win
- python 3.4
- pip
- selenium driver python
- (chromedriver already included)
    - may need a way to check if chrome driver is the latest or to Roll back

# Installation notes
run ```npm install && npm run```
take note of the local network address of the computer you are running it on so that you can send requests to the express api server.

The express api server accepts standard json requests with the header ```Content-Type : application/json```
