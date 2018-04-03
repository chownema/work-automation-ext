const open = require('open');
const mOpen = require('mac-open')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/open', (req, res) => {
    const url = req['body']['url'];
    const timeout = typeof req['body']['timeout'] !== 'undefined' ?  req['body']['timeout'] : 30;
    const isSafari = typeof req['body']['isSafari'] !== 'undefined' ?  req['body']['isSafari'] : false;
    const isFF = typeof req['body']['isFF'] !== 'undefined' ?  req['body']['isFF'] : false;

    console.log('opening', req.body.url)
    if (url) {
        if (isSafari) {
                mOpen(url, { a: 'safari' }, (err)=>{ console.error() })
        } else if (isFF) {
                mOpen(url, { a: 'firefox' }, (err)=>{ console.error() })
        } else {
                open(url)
        }
    setTimeout(() => {
            res.send('opening url.....')
        }, timeout*1000)
    }
})

app.listen(4444, () => console.log('4444'))
