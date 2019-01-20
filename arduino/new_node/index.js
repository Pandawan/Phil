const SerialPort = require('serialport');
const axios = require('axios');

// todo: change port so it works on Rohan's Mac
const serial = new SerialPort('/dev/tty-usbserial1', {
    baudRate: 115200
});

let date = new Date();
let value = 0x00;

function toggle() {
    value = value === 0x00 ? 0x01 : 0x00;
    return serial.write(new Buffer([value]));
};


function check() {
    axios.get('https://dweet.io/get/latest/dweet/for/quagmire').then((response) => {
            console.log('Refresh!');
            const newDate = new Date(response.data.with[0].created);
            if (date < newDate) {
                console.log('Light up!');
                date = newDate;
            }
            toggle();
            setTimeout(toggle, 500);
            setTimeout(check, 5000);
        })
        .catch((error) => {
            console.error('Something went wrong', error)
        });
}


check();