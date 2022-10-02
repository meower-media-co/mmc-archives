import time

class EasyUART:
    def __init__(self, bus):
        self.bus = bus
        
    def connect(self): # This code is platform specific
        if not self.bus.connected:
            while not self.bus.connected:
                time.sleep(1)
        self.bus.reset_input_buffer()
        return True
    
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
