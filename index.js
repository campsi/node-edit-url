const {parse, format} = require('url');
/**
 * @name UrlObject
 * @type {Object}
 * @property {String} protocol
 * @property {String|Number} port
 * @property {String} hostname
 * @property {String} pathname
 * @property {String} hash
 * @property {Object} query
 * @property {String} auth
 */
/**
 * @callback editFunction
 * @param {UrlObject} obj
 * @param {Function} [cb] if editURL is called async
 */
/**
 *
 * @param {String} url
 * @param {editFunction} fn
 * @param {Function} [cb] Optional : if specified, a callback is passed to the modifyFunction
 */
module.exports = function editURL(url, fn, cb) {
    const parsed = parse(url, true, true);
    let obj = JSON.parse(JSON.stringify(parsed));
    delete obj.host;
    delete obj.path;
    delete obj.href;
    delete obj.search;
    if (typeof cb === 'function') {
        fn(obj, ()=>cb(format(obj)));
    } else {
        fn(obj);
        return format(obj);
    }
};
