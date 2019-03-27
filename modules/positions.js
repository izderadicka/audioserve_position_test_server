const onFinish = require('node-cleanup');
const {maxPositions, positionsFile} = require('../config/config');
const fs = require('fs');

onFinish((code,signal) => {
 
 const data = positions.serialize();
 fs.writeFileSync(positionsFile, data);
 console.log(`SAVED data ${data}`);

});



class Positions {
    constructor(serialized) {
        this.data = serialized?new Map(JSON.parse(serialized)):new Map();
        
    }

    serialize() {
        return JSON.stringify([...this.data]);
    }
    
    insert(fileKey, timeStamp, position) {
        const lastSlash = fileKey.lastIndexOf('/');
        const folderKey = lastSlash>=0? fileKey.substr(0,lastSlash):fileKey;
        const file = lastSlash>=0? fileKey.substr(lastSlash+1): fileKey;

        this.data.delete(folderKey);
        this.data.set(folderKey, {
            file,
            timeStamp,
            position
        });

        if (this.data.size > maxPositions) {
            const oldestKey= this.data.keys().next();
            if (oldestKey.value) {
                this.data.delete(oldestKey.value)
            }
        }

    }

    get(folderKey) {
        const res = this.data.get(folderKey);
        if (res) {
            res.folder = folderKey;
            return res;
        }
       
    }

    getLast() {
        const folderKey = Array.from(this.data.keys())[this.data.size -1];
        if (folderKey) {
            const res = this.data.get(folderKey);
            res.folder = folderKey;
            return res;
        }
        
    }

    get size() {
        return this.data.size;
    }

    clear() {
        this.data.clear();
    }
}

const positions = function() {
    const data = fs.readFileSync(positionsFile);
    return new Positions(data);
}();
module.exports = positions;

