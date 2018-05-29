from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from constants_webclient import ConstantsWebclient

import pickle
import time
import argparse

CONSTANTS_WEBCLIENT = ConstantsWebclient.get_constants();
parser = argparse.ArgumentParser()
parser.add_argument('URL', type=str, help='path to the webclient section for testing')
parser.add_argument('DRIVER_PATH', type=str, help='path to the driver executable')


ARGS = parser.parse_args()
URL = ARGS.URL
DRIVER_PATH = ARGS.DRIVER_PATH

chrome_options = Options()
chrome_options.add_argument('--use-fake-device-for-media-stream')
chrome_options.add_argument('--use-fake-ui-for-media-stream')
driver = webdriver.Chrome(DRIVER_PATH, chrome_options=chrome_options)
time.sleep(3)
driver.get(URL)
# try:
#     myElem = WebDriverWait(driver, CONSTANTS_WEBCLIENT.PAGE_LOAD_DELAY).until(EC.presence_of_element_located((By.CLASS, CONSTANTS_WEBCLIENT.MEETING_APP_AWAIT_EL_CLS)))
# except TimeoutException:
#     print('Loading took too much time!')

# send accross keys to accept webrtc device requests
time.sleep(18)
actions = ActionChains(driver)
actions.send_keys(Keys.TAB)
actions.send_keys(Keys.TAB)
actions.send_keys(Keys.RETURN)
actions.send_keys(Keys.TAB)
actions.send_keys(Keys.TAB)
actions.send_keys(Keys.RETURN)
actions.perform()
print('action chain performed')
# driver.close()
# pickle.dump( driver.get_cookies() , open("cookies.pkl","wb"))
# cookies = pickle.load(open("cookies.pkl", "rb"))
# for cookie in cookies:
#     driver.add_cookie(cookie)

# assert "Python" in driver.title
# elem = driver.find_element_by_name("q")
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source