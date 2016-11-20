const mocha = require('mocha');
const assert = require('assert');
const {describe, it} = mocha;
const edit = require('./index');

const url = 'https://romain:password@localhost:3000/p/a/t/h?foo=bar&arr=a&arr=b#!/hash/hashQuery?long';

describe('sync', ()=> {
    let edited;
    it('port', ()=> {
        edited = edit(url, (obj)=> obj.port = 3001);
        assert.equal(edited, 'https://romain:password@localhost:3001/p/a/t/h?foo=bar&arr=a&arr=b#!/hash/hashQuery?long')
    });
    it('protocol', ()=> {
        edited = edit(url, (obj)=> obj.protocol = 'http');
        assert.equal(edited, 'http://romain:password@localhost:3000/p/a/t/h?foo=bar&arr=a&arr=b#!/hash/hashQuery?long')
    });
    it('hostname', ()=> {
        edited = edit(url, (obj)=> obj.hostname = 'example.com');
        assert.equal(edited, 'https://romain:password@example.com:3000/p/a/t/h?foo=bar&arr=a&arr=b#!/hash/hashQuery?long')
    });
    it('auth', ()=> {
        edited = edit(url, (obj)=> obj.auth = 'admin:password');
        assert.equal(edited, 'https://admin:password@localhost:3000/p/a/t/h?foo=bar&arr=a&arr=b#!/hash/hashQuery?long')
    });
    it('pathname', ()=> {
        edited = edit(url, (obj)=> obj.pathname = 'path');
        assert.equal(edited, 'https://romain:password@localhost:3000/path?foo=bar&arr=a&arr=b#!/hash/hashQuery?long')
    });
    it('query change param', ()=> {
        edited = edit(url, (obj)=> obj.query.foo = 'barfoo');
        assert.equal(edited, 'https://romain:password@localhost:3000/p/a/t/h?foo=barfoo&arr=a&arr=b#!/hash/hashQuery?long')
    });
    it('query remove param', ()=> {
        edited = edit(url, (obj)=> delete obj.query.foo);
        assert.equal(edited, 'https://romain:password@localhost:3000/p/a/t/h?arr=a&arr=b#!/hash/hashQuery?long')
    });
    it('hash', ()=> {
        edited = edit(url, (obj)=> obj.hash = 'newHash');
        assert.equal(edited, 'https://romain:password@localhost:3000/p/a/t/h?foo=bar&arr=a&arr=b#newHash')
    });
});

describe('async', ()=> {
    it('test', (done)=> {
        edit(url, (obj, cb)=> {
            setTimeout(()=>{
                delete obj.hash;
                delete obj.query.arr;
                obj.query.foo = 'barfoo';
                obj.auth = 'admin:password';
                obj.port = 8080;
                obj.protocol = 'http';
                obj.hostname = 'example.com';
                obj.pathname = 'path';
                cb();
            }, 500)
        }, (edited)=> {
            assert.equal(edited, 'http://admin:password@example.com:8080/path?foo=barfoo');
            done();
        });
    });
});

describe('troubleshoot', ()=>{
    it('no query string', ()=>{
        let result = edit('http://google.com/', (obj) => obj.query.q = "Node.JS");
        assert.equal(result, 'http://google.com/?q=Node.JS');
    });

    it('missing protocol', ()=>{
        let result = edit('//example.com/profile', (obj) => obj.protocol = "http");
        assert.equal(result, 'http://example.com/profile');
    });

});