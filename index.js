const express = require('express');
const app = express();

app.use(express.static('/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

function isUnixTimestamp(input) {
    return Number.isInteger(input) && input >= 0;
}

let unixTimestamp = 1672531199; // Example Unix timestamp
let date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
console.log(date.toUTCString());
app.get('/api/:date', function (req, res) {
    try {
       
        const currentDate = new Date();
        const date = req.params.date;

        let validDate;

        if (!isNaN(date)) {
            validDate = new Date(Number(date));
        } else {
            validDate = new Date(date)
        };

        if (isNaN(validDate)) {
            res.json({
                message: 'Invalid date!'
            })
        }

        let unixTimestamp = Math.floor(validDate * 1000);

        let utcTime =  validDate.toUTCString();

        res.json({
            unix: unixTimestamp,
            utc: utcTime
        });


    } catch (err) {
        res.json({
            error: err.message
        })
    }
})
app.listen(8000, () => {
    console.log('Server is listening on port 8000!')
})