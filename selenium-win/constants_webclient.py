class ConstantsWebclient(object):
    @classmethod
    def get_constants(self):
       self.LOCAL_WEBCLIENT_URL = 'https://mlocal.suitebox.com:3000'
       self.PAGE_LOAD_DELAY = 30
       self.MEETING_APP_AWAIT_EL_CLS = 'user-controls'
       return self
