import time
class Participant(object):
    @classmethod
    def login(self, **kwargs):
        time.sleep(3)
        kwargs['DRIVER'].get(kwargs['url'])