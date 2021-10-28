//import { createRequire } from 'module';
import express from 'express';
import path from 'path';
import {fileURLToPath} from "url"
//const require = createRequire(import.meta.url);
//const express = require('express');
//const fs = require('fs');
//const path = require('path');

// APP
const app = express();

// JS, CSS e IMG
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + '/public'));



// Rotas

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(8080,() => console.log('server is running'))




/*
const http = require('http');
const fs = require('fs');
const path = require('path');


http.createServer((req, res) => {
 
    const file = req.url  === '/' ? 'index.html' : req.url

    const filePath = path.join(__dirname, 'public', file);
    const extname = path.extname(filePath)

    const allowedFileTypes = ['.html', '.css', '.js', '.png']
    const allowed = allowedFileTypes.find(item => item == extname)

    if(!allowed) return    
    
        fs.readFile(
            filePath,
            (err, content) =>{
                if(err) throw err

                res.end(content)
            }
        )
    
}).listen(5000, () => console.log('Server is running'));
*/