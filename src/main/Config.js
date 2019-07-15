const _ = require('lodash');

const ENV_VARS = process.env;
const ENV_SCOPE = 'BTARB';
const DEPTH_DELIMITER = '__';
const ENV_PREFIX = ENV_SCOPE + DEPTH_DELIMITER;

const DEFAULT_CONFIG = require('../../config/default-config');

let localConfig;
try {
    localConfig = require('../../config/config');
} catch (e) {
    localConfig = {};
}

// build object from environment variables. BTARB__PATH__TO__ENV_VAR => CONFIG.PATH.TO.ENV_VAR
const ENV_CONFIG = Object.keys(ENV_VARS)
    .filter(env_key => env_key.indexOf(ENV_PREFIX) === 0)
    .reduce((obj, env_key) => {
        var path = env_key.slice(ENV_PREFIX.length).split(DEPTH_DELIMITER);
        _.set(obj, path, ENV_VARS[env_key]);
        return obj;
    }, {});


const CONFIG = _.merge({}, DEFAULT_CONFIG, localConfig, ENV_CONFIG);

module.exports = CONFIG;
