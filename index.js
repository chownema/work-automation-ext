const open = require('open')
const opn = require('opn')
const mOpen = require('mac-open')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const osName = require('os-name')
const cmd = require('node-cmd')

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/open', (req, res) => {
    const url = req['body']['url'];
    const timeout = typeof req['body']['timeout'] !== 'undefined' ?  req['body']['timeout'] : 30;
    const isSafari = typeof req['body']['isSafari'] !== 'undefined' ?  req['body']['isSafari'] : false;
    const isFF = typeof req['body']['isFF'] !== 'undefined' ?  req['body']['isFF'] : false;
    const isEdge = typeof req['body']['isEdge'] !== 'undefined' ?  req['body']['isEdge'] : false;
    const isChrome = typeof req['body']['isChrome'] !== 'undefined' ?  req['body']['isChrome'] : false;
    const isIExplorer = typeof req['body']['isIExplorer'] !== 'undefined' ?  req['body']['isIExplorer'] : false;

    const osId = osName();
    const isOsx = osId.includes('macOs');
    const isWindows = osId.includes('Windows');

    console.log('opening', req.body.url, osId);
    if (url) {
        if (isOsx) {
                if (isSafari) mOpen(url, { a: 'safari' }, (err)=>{ console.error() })
                else if (isFF) mOpen(url, { a: 'firefox' }, (err)=>{ console.error() })
                else if (isChrome) mOpen(url, {app: 'google chrome'})
                else open(url)
        } else if (isWindows) {
                if (isFF) opn(url, {app: 'firefox'})
                else if (isEdge) opn(url, {app: 'edge'})
                else if (isChrome) opn(url, {app: 'chrome'})
                else if (isIExplorer) opn(url, {app: 'iexplore'})
                else opn(url) 
        } else {
                open(url)    
        }
    setTimeout(() => {
            res.status(200);
            res.send('opening url : '+url)
        }, timeout*1000)
    }
})


app.post('/version', (req, res) => {
    const isPatch = typeof req['body']['isPatch'] !== 'undefined' ?  req['body']['isPatch'] : false;
    if (isPatch) {
        console.log('Patching Application...');
        // Works on a windows machine
        cmd.get('cd ../ && cd sbx-webclient-php && echo %cd% && git pull && npm version patch', (err, stdout, stderr)=> {
                const result = {
                        err: err,
                        out: stdout,
                        derr: stderr
                }
                res.status(200);
                res.send(result);
        })
    } else {
        console.log('Malformed request');
        res.status(400);
        res.send('Malformed request');
    }
})
app.listen(4444, () => console.log(' Server running on port 4444'))
