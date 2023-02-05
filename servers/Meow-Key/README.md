# Meow-Key
Custom implementation of hardware-based security keys using common microcontrollers.

# Functionality
* Provide hardware-based security to Meower servers
* Permit one key transmission per physical key removal
* Easily removable key in event of server compromise
* Secure storage for encryption/decryption key for email addresses

# Basic spec
Instructions and communication between the microcontroller and a host system defaults to the micrcontroller's built-in USB interface.
To prevent the device from getting USB Power reset, attach a capacitor of at least 200uF onto the microcontroller's VCC and GND pins.
Communications are done using a very simple JSON protocol.

| Command | Description | Returns |
| --- | --- | --- |
| {"cmd": "ACK?"} | Pings/initializes the microcontroller | {"cmd": "ACK!"} |
| {"cmd": "KEY?"} | Requests the security key from the microcontroller. | If key has not been used: {"cmd": "KEY!", "key": (YOUR KEY HERE)}, if already used: {"cmd": "NOKEY!"} |

## Errors
{"cmd": "ERROR", "msg": (ERROR CODE HERE)}
This packet will be transmitted by the microcontroller in the event that a exception has been thrown or some form of error has occurred.

# Making custom commands for nonstandard functionality
To keep command formatting consistent across platforms:

* All host system request commands must follow this format: {"cmd": "(YOUR COMMAND HERE)?"}
* All microcontroller response commands must follow this format: {"cmd": "(YOUR COMMAND HERE)!", "(SPECIAL DATA)": (SPECIAL DATA HERE)} 
