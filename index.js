const {parse, format} = require('url');

module.exports = function editURL(subject, fn, cb) {
    const parsed = parse(subject, true, true);
    let obj = JSON.parse(JSON.stringify(parsed));
    delete obj.host;
    delete obj.path;
    delete obj.href;
    delete obj.search;
    if (typeof cb === 'function') {
        fn(obj, ()=>cb(format(obj)));
    } else {
        console.dir(obj);
        fn(obj);
        return format(obj);
    }
};