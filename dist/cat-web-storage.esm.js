/**!
 * cat-web-storage v0.2.1
 * Author: Lin.xs | Email: yunfax@outlook.com
 * (c) 2020 Lin.xs
 * @license MIT
 */
// 存储值转换成字符串
function value2Stringify(value) {
    return typeof value === 'string'
        ? value : typeof value === 'object'
        ? Array.isArray(value) ? ("[" + (value.toString()) + "]") : JSON.stringify(value)
        : value.toString();
}
// 解析存储的值
function ParseValue(value) {
    if (!value) {
        return;
    }
    var tempLen = value.length;
    var tempLenEnd = tempLen - 1;
    var strMatch = function (val, strArr) {
        if ( val === void 0 ) val = '';

        return value.indexOf(strArr[0]) === 0 && val.indexOf(strArr[1]) === tempLenEnd;
    };
    if (strMatch(value, ['{', '}'])) {
        return JSON.parse(value);
    }
    else if (strMatch(value, ['[', ']'])) {
        return value.substr(1, tempLenEnd - 1).split(',');
    }
    else {
        return value;
    }
}
// 验证存储参数
function validateParams(key, value) {
    if (!key || typeof key !== 'string') {
        console.error('Argument of type "1" is not assignable to parameter of type "string".');
        return false;
    }
    if (!value) {
        console.error('An argument for "value" was not provided.');
        return false;
    }
    return true;
}
// localStorage 实现类
var LocalStorage = function LocalStorage() {
    this.local = window.localStorage;
    this.opts = {
        type: 'd',
        expires: 0,
        encrypt: false,
    };
};
// set local storage item
LocalStorage.prototype.set = function set (key, value, opts) {
        if ( opts === void 0 ) opts = this.opts;

    if (!validateParams(key, value)) {
        return;
    }
    if (opts.encrypt) {
        // 
        this.local.setItem(key, value2Stringify(value));
    }
    else {
        this.local.setItem(key, value2Stringify(value));
    }
};
// get local storage item
LocalStorage.prototype.get = function get (key) {
    if (!key && typeof key !== 'string') {
        return undefined;
    }
    return ParseValue(this.local.getItem(key));
};
// update local storage item
LocalStorage.prototype.update = function update (key, value, opts) {
        if ( opts === void 0 ) opts = this.opts;

    if (!key && typeof key !== 'string') {
        return undefined;
    }
    var tempItem = this.get(key);
    if (!tempItem) {
        return undefined;
    }
    this.set(key, value, opts);
    return tempItem;
};
// remove local storage item
LocalStorage.prototype.remove = function remove (key) {
    if (!key && typeof key !== 'string') {
        return undefined;
    }
    var tempItem = this.get(key);
    if (!tempItem) {
        return undefined;
    }
    this.local.removeItem(key);
    return ParseValue(tempItem);
};
LocalStorage.prototype.key = function key (index) {
    if (typeof index !== 'number') {
        return undefined;
    }
    return this.local.key(index);
};
LocalStorage.prototype.clear = function clear () {
    this.local.clear();
};
// sessionStorage 实现类
var SessionStorage = function SessionStorage() {
    this.session = window.sessionStorage;
    this.opts = {
        type: 'd',
        expires: 0,
        encrypt: false,
    };
};
// set session storage item
SessionStorage.prototype.set = function set (key, value, opts) {
        if ( opts === void 0 ) opts = this.opts;

    if (!validateParams(key, value)) {
        return;
    }
    if (opts.encrypt) {
        // 
        this.session.setItem(key, value2Stringify(value));
    }
    else {
        this.session.setItem(key, value2Stringify(value));
    }
};
// get session storage item
SessionStorage.prototype.get = function get (key) {
    if (!key && typeof key !== 'string') {
        return undefined;
    }
    return ParseValue(this.session.getItem(key));
};
// update session storage item
SessionStorage.prototype.update = function update (key, value, opts) {
        if ( opts === void 0 ) opts = this.opts;

    if (!key && typeof key !== 'string') {
        return undefined;
    }
    var tempItem = this.get(key);
    if (!tempItem) {
        return undefined;
    }
    this.set(key, value, opts);
    return tempItem;
};
// remove session storage item
SessionStorage.prototype.remove = function remove (key) {
    if (!key && typeof key !== 'string') {
        return undefined;
    }
    var tempItem = this.get(key);
    if (!tempItem) {
        return undefined;
    }
    this.session.removeItem(key);
    return ParseValue(tempItem);
};
SessionStorage.prototype.key = function key (index) {
    if (typeof index !== 'number') {
        return undefined;
    }
    return this.session.key(index);
};
SessionStorage.prototype.clear = function clear () {
    this.session.clear();
};
// document.cookie 实现类
var CookieStorage = function CookieStorage() {
    this.opts = {
        type: 'd',
        expires: 0,
        encrypt: false,
        path: '/',
    };
};
// 设置过期时间
CookieStorage.prototype.setExpiresTime = function setExpiresTime (type, num) {
    var tempTimeObj = new Date();
    var tempTime = +new Date();
    switch (type) {
        case 'm':
            tempTimeObj.setTime(tempTime + num * 60 * 1000);
            return tempTimeObj.toUTCString();
        case 'h':
            tempTimeObj.setTime(tempTime + num * 3600 * 1000);
            return tempTimeObj.toUTCString();
        case 'd':
            tempTimeObj.setTime(tempTime + num * 24 * 3600 * 1000);
            return tempTimeObj.toUTCString();
        case 'M':
            tempTimeObj.setTime(tempTime + num * 30 * 24 * 3600 * 1000);
            return tempTimeObj.toUTCString();
        case 'y':
            tempTimeObj.setTime(tempTime + num * 365 * 24 * 3600 * 1000);
            return tempTimeObj.toUTCString();
        default:
            tempTimeObj.setTime(tempTime + num * 24 * 3600 * 1000);
            return tempTimeObj.toUTCString();
    }
};
// set cookie storage item
CookieStorage.prototype.set = function set (key, value, opts) {
        if ( opts === void 0 ) opts = this.opts;

    if (!key || !value) {
        return;
    }
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    var tempCookie = '';
    if (opts.encrypt) {
        // 
        tempCookie += key + "=" + value;
    }
    else {
        tempCookie += key + "=" + value;
    }
    if (typeof opts.expires === 'number' && opts.expires > 0) {
        tempCookie += "; expires=" + (this.setExpiresTime(opts.type, opts.expires));
    }
    if (opts.path && opts.path !== '' && opts.path !== '/') {
        tempCookie += "; path=" + (opts.path);
    }
    document.cookie = tempCookie;
};
// get cookie storage item
CookieStorage.prototype.get = function get (key) {
    if (!key && typeof key !== 'string') {
        return undefined;
    }
    if (!document.cookie) {
        return undefined;
    }
    var tempCookie = document.cookie;
    var tempItems = tempCookie.split('; ');
    var cookieValue = '';
    tempItems.forEach(function (item, index) {
        var i = item.split('=');
        if (key === i[0]) {
            cookieValue = i[1];
        }
    });
    return cookieValue;
};
// update cookie storage item
CookieStorage.prototype.update = function update (key, value, opts) {
        if ( opts === void 0 ) opts = this.opts;

    if (!key && typeof key !== 'string') {
        return undefined;
    }
    var tempCookieItem = this.get(key);
    if (tempCookieItem) {
        this.set(key, value, opts);
    }
    return tempCookieItem;
};
// remove cookie storage item
CookieStorage.prototype.remove = function remove (key) {
    if (!key && typeof key !== 'string') {
        return undefined;
    }
    var tempCookie = this.get(key);
    document.cookie = key + "=; expires=" + (this.setExpiresTime('all', -1));
    return tempCookie;
};
CookieStorage.prototype.key = function key (index) {
    if (typeof index !== 'number') {
        return undefined;
    }
    var tempCookie = document.cookie;
    var tempItems = tempCookie.split('; ');
    var cookieKey = '';
    tempItems.forEach(function (item, cindex) {
        var i = item.split('=');
        if (index === cindex) {
            cookieKey = i[0];
        }
    });
    return cookieKey;
};
CookieStorage.prototype.clear = function clear () {
        var this$1 = this;

    if (!document.cookie) {
        return;
    }
    var tempCookie = document.cookie;
    var tempItems = tempCookie.split('; ');
    tempItems.forEach(function (item) {
        var i = item.split('=');
        document.cookie = (i[0]) + "=; expires=" + (this$1.setExpiresTime('all', -1));
    });
};

// export 
var _VUE;
var install = function (Vue, opts) {
    if (install.installed && _VUE === Vue) {
        return;
    }
    install.installed = true;
    _VUE = Vue;
    var localStorage = new LocalStorage();
    var sessionStorage = new SessionStorage();
    var cookieStorage = new CookieStorage();
    Object.defineProperty(Vue.prototype, '$localStorage', {
        get: function get() { return localStorage; },
    });
    Object.defineProperty(Vue.prototype, '$sessionStorage', {
        get: function get() { return sessionStorage; },
    });
    Object.defineProperty(Vue.prototype, '$cookieStorage', {
        get: function get() { return cookieStorage; },
    });
};
install.installed = false;
var WebStorage = function WebStorage() {
    this.options = {};
    this.app = null;
    this.apps = [];
    this.ready = false;
    this.options = {};
};
WebStorage.install = install;
var inBrowser = typeof window !== 'undefined';
if (inBrowser && window.Vue) {
    window.Vue.use(WebStorage);
}
else if (inBrowser && Object.defineProperty) {
    Object.defineProperty(window, '$localStorage', {
        get: function get() { return new LocalStorage(); },
    });
    Object.defineProperty(window, '$sessionStorage', {
        get: function get() { return new SessionStorage(); },
    });
    Object.defineProperty(window, '$cookieStorage', {
        get: function get() { return new CookieStorage(); },
    });
}

export default WebStorage;
