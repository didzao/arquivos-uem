const regex = /\s/g;

const normalize = (str) => {
    return str.toLowerCase().replace(regex, '');
}

const STATUS_ERROR = 500;
const STATUS_NOT_FOUND = 404;

const PORT_1 = 3001;
const PORT_2 = 3002;
const PORT_3 = 3003;

module.exports = {
    PORT_1: PORT_1,
    PORT_2: PORT_2,
    PORT_3: PORT_3,
    normalize: normalize,
    STATUS_ERROR: STATUS_ERROR,
    STATUS_NOT_FOUND: STATUS_NOT_FOUND,
};



