const SerialPort = require('serialport');
const axios = require('axios');

const serial = new SerialPort('/dev/tty.usbserial-DN03GDN9', {
    baudRate: 115200
});

serial.on('data', buffer => {
    console.log('Data:', buffer[0])
});

let date = new Date();

function check() {
    axios.get('https://dweet.io/get/latest/dweet/for/quagmire').then((response) => {
            console.log('Refresh!');
            const newDate = new Date(response.data.with[0].created);
            if (date < newDate) {
                console.log('Light up!');
                date = newDate;
                serial.write('1', err => {
                    if (err)
                        console.log(err.message)
                });
            }
            setTimeout(check, 5000);
        })
        .catch((error) => {
            console.error('Something went wrong', error)
        });
}


check();
