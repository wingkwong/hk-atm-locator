
const fs = require('fs');
const crypto = require('crypto');
const { remind, info } = require('./utils');

const generateChecksum = (data, md5Path) => {
    const checksum = crypto
                        .createHash('md5')
                        .update(data, 'utf8')
                        .digest('hex');
    if(shouldWriteChecksum(md5Path, checksum)) {
        fs.writeFileSync(md5Path, checksum);
        remind(`Finished generating checksum file at ${md5Path}`);
    } else {
        fs.unlinkSync(md5Path);
    }
}

const shouldWriteChecksum = (md5Path, checksum) => {
    if(!fs.existsSync(md5Path)) {
        return true;
    }
    const checksumInmd5 = fs.readFileSync(md5Path);
    return checksum === checksumInmd5 ? false : true;
}

module.exports = {
    generate: async (data, md5Path) => {
        info(`Processing checksum at ${md5Path}`);
        generateChecksum(data, md5Path);
        remind(`Finished processing checksum file and saved at ${md5Path}`);
    }
};
  