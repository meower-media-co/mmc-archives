import serial
import json
import time
from easyuart import EasyUART

if __name__ == "__main__":
    uart = EasyUART(serial.Serial(port = input("Input your MeowKey COM port: "), baudrate = 9600)) # Init the module by passing along a serial module
    print(uart.connect())
    print(uart.rx()) # USE THIS TO KEEP IN SYNC WITH TEMPLATE CODE ON MICROCONTROLLER
    uart.tx(json.dumps({"cmd": "ACK?"}))