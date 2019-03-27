var express = require('express');
var router = express.Router();
const positions = require('../modules/positions');

router.ws('/myws', function(ws,req) {
    
    ws.on('message', msg => {
        console.log(`Got message ${msg}`);
        const data = msg.split("|");
        if (data.length==2) {
            const position = parseFloat(data[0]);
            const filePath = data[1];
            const timeStamp = Date.now();
            positions.insert(filePath, timeStamp, position);
        }
        else if (data.length == 1) {
            const folderPath = data[0];
            const response = {};
            response.last = positions.getLast();
            if (folderPath!="?" || folderPath.length) {
                folder = positions.get(folderPath);
                if (folder) {
                    response.folder = folder;
                }
            }
            ws.send(JSON.stringify(response));
        }
        else {
            console.error("Invalid message ", msg);
        }
        
    });
});

module.exports = router;