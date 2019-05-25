
const fs = require('fs');
const { remind, info } = require('./utils');

const generateStats = (data, output) => {
    //TODO
}

module.exports = {
    generate: async (data, output) => {
        info(`Generating stats at ${output}`);
        generateStats(data, output);
        remind(`Finished generating stats and saved at ${output}`);
    }
};
  