from selenium.webdriver.common.by import By

class Host(object):
    @classmethod
    def login(self, **kwargs):
        username = kwargs['username']
        password = kwargs['password']
        driver = kwargs['DRIVER']
        driver.get(kwargs['url'])
        username_field = driver.find_element_by_name('username')
        password_field = driver.find_element_by_name('password')
        button = driver.find_element_by_id('login-button')
        username_field.send_keys(username)
        password_field.send_keys(password)
        button.click()

    @classmethod
    def enter_meeting_lobby(self, **kwargs):
        self.login(**kwargs)
        driver = kwargs['DRIVER']
        exit_button = driver.find_element_by_name('exit-button')
        exit_button.click()
        confirm_modal_buttton = driver.find_element(By.XPATH, '//button[text()="Confirm"]')
