# import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

# import other libs
import pickle
import time
import argparse
import json
import sys
# import test constants
from constants_webclient import ConstantsWebclient

#import test scripts
from test_scripts.host import Host
from test_scripts.participant import Participant
from test_scripts.trial import Trial

CONSTANTS_WEBCLIENT = ConstantsWebclient.get_constants();
parser = argparse.ArgumentParser()
parser.add_argument('DRIVER_PATH', type=str, help='path to the driver executable')
parser.add_argument('COMMAND', type=str, help='what will you do with a drunken sailor')
parser.add_argument('DATA_PATH', type=str, help='what will you do with a drunken sailor')

ARGS = parser.parse_args()
DRIVER_PATH = ARGS.DRIVER_PATH

DATA = {}
with open(ARGS.DATA_PATH) as data_file:
    DATA = json.loads(data_file.read())
COMMAND = DATA['command']

chrome_options = Options()

chrome_options.set_capability('acceptInsecureCerts', True)
chrome_options.add_argument('--use-fake-device-for-media-stream')
chrome_options.add_argument('--use-fake-ui-for-media-stream')
chrome_options.add_argument('--ignore-certificate-errors')
driver = webdriver.Chrome(DRIVER_PATH, chrome_options=chrome_options)
driver.implicitly_wait(120)
DATA['DRIVER'] = driver
print(DATA)

COMMANDS = {
    'host-login' : Host.login,
    'host-meeting-details' : Host.enter_meeting_lobby,
    'participant-login' : Participant.login,
    'trial-sign-up' : Trial.signUp
}

commandFunction = COMMANDS[COMMAND]
commandFunction(**DATA) # dictionary
