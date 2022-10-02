import usb_cdc
import storage

# storage.disable_usb_drive() Uncomment in production, but YOU MUST HAVE A BACKUP OF YOUR KEYS AND CODE AS ONCE YOU DISABLE THIS YOU WILL NOT BE ABLE TO RECOVER WITHOUT A FLASH RESET
usb_cdc.enable(console=True, data=True) # For debugging, leave console enabled, but when in deployment disable for security purposes
