const open = require('open')
const opn = require('opn')
const mOpen = require('mac-open')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const osName = require('os-name')
const cmd = require('node-cmd')
const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')
// const scriptTakeControl = require('./webdriver-scripts/take-control');
// require('chromedriver');

const PythonShell = require('python-shell')
const winPyShellEntry = 'selenium-win/index.py'
const winPyShellChromeDriver = 'selenium-win/chromedriver'
const winPyShellRequestFile = 'selenium-win/request_data.json'

const writeFile = require('write');
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/webdriver', (req, res) => {
    const timeout = typeof req['body']['timeout'] !== 'undefined' ?  req['body']['timeout'] : 5;
    // Dict of data for the python to use
    const data = req['body']['data'];
    const command = req['body']['command'];
    const dataString = JSON.stringify(data)

    console.log(dataString)

    writeFile.promise(winPyShellRequestFile, dataString).then((err)=>{
        if (err) console.log(err)
        
        const options = {
            args : [winPyShellChromeDriver, command, winPyShellRequestFile]
        }
        const winPyShell = PythonShell.run(winPyShellEntry, options, (err, results)=>{
            if (err) console.log(err)
            console.log(results)
        })

        
        // end the input stream and allow the process to exit
        winPyShell.end(function (err,code,signal) {
            if (err) throw err;
            console.log('The exit code was: ' + code)
            console.log('The exit signal was: ' + signal)
            console.log('finished')
            const result = {
                message : err ? err : 'finished',
                code : code,
                signal : signal,
                url : url
            }
            res.send(result)
        })
        setTimeout(() => {
                res.status(200);
                res.send('opening url : '+data+command)
            }, timeout*1000)
        })
})

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
    const branch = typeof req['body']['branch'] !== 'undefined' ?  req['body']['branch'] : false;

    if (isPatch) {
        console.log('Patching Application...');
        // Works on a windows machine
        const branchCommand = branch ? '&& git checkout origim/'+branch : '';
        cmd.get('cd ../ && cd sbx-webclient-php && echo %cd% && git pull'+branchCommand+'&& npm version patch && git checkout orign/release-candidate', (err, stdout, stderr)=> {
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

const port = 4444
app.listen(port, () => console.log(' Server running on port '+port))
