from selenium.webdriver.support.ui import Select
from test_scripts.host import Host

class Trial(object):
    @classmethod
    def signUp(self, **kwargs):
        host_login_data = kwargs['loginData']
        host_login_data['DRIVER'] = kwargs['DRIVER']
        Host.login(**host_login_data)
        fName = kwargs['fName']
        lName = kwargs['lName']
        email = kwargs['email']
        phone = kwargs['phone']
        country = kwargs['country']
        driver = kwargs['DRIVER']
        driver.get(kwargs['url'])

        submit_form_button = driver.find_element_by_id('submit-form-button') 
        first_name_input = driver.find_element_by_id('firstName') 
        last_name_input = driver.find_element_by_id('lastName') 
        email_input = driver.find_element_by_id('Email') 
        phone_input = driver.find_element_by_id('phone') 
        country_select = Select(driver.find_element_by_id('shipCountry')) 
        toc_input = driver.find_element_by_id('tosAccepted') 
    
        first_name_input.send_keys(fName)   
        last_name_input.send_keys(lName)   
        email_input.send_keys(email) 
        phone_input.send_keys(phone)  
        country_select.select_by_visible_text(country)  
        toc_input.click()  
        
        submit_form_button.click()                                                                                                                                            