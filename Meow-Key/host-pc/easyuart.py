import time

class EasyUART:
    def __init__(self, bus):
        self.bus = bus
	
    def connect(self): # This code is platform specific
        if self.bus.is_open:
            # Close existing port if the script didn't close it earlier
            self.bus.close()
            time.sleep(1)
        # Open the port and wait a bit since it's slow to init the port
        self.bus.open()
        time.sleep(1)
        if self.bus.is_open:
            return True
        else:
            return False
    
    def tx(self, payload): # Leave encoding as ASCII since literally everything supports it
        self.bus.write(bytes(payload + "\r", "ASCII"))

    def rx(self):
        done = False
        tmp = ""
        while not done:
            # Listen for new data
            if self.bus.in_waiting != 0:
                readin = self.bus.read(self.bus.in_waiting).decode("ASCII")
                for thing in readin:
                    if thing == "\r":
                        done = True
                    else:
                        tmp += thing
        return tmp