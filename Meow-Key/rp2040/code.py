import time
import usb_cdc
import json
from easyuart import EasyUART

if usb_cdc.data is None:
    print("Need to enable USB CDC serial data in boot.py!")
    while True:
        pass

if __name__ == "__main__":
    uart = EasyUART(usb_cdc.data) # Init the module by passing along a serial module
    print(uart.connect())
    uart.tx(json.dumps({"cmd": "ACK?"}))
    print(json.loads(uart.rx())) # USE THIS TO KEEP IN SYNC WITH TEMPLATE CODE ON HOST MACHINE