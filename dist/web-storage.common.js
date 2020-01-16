/*!
 * web-storage v0.1.0
 * Author: Lin.xs | Email: yunfax@outlook.com
 * (c) 2020 Lin.xs
 * @license ISC
 */
'use strict';

// 存储值转换成字符串
function value2Stringify(value) {
  return typeof value === 'string'
    ? value : typeof value === 'object'
      ? Array.isArray(value) ? ("[" + (value.toString()) + "]") : JSON.stringify(value)
      : value.toString();
}
// 解析存储的值
function ParseValue(value) {
  var tempLen = value.length;
  var tempLenEnd = tempLen - 1;
  var strMatch = function (val, strArr) {
    if (val === void 0) val = '';

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
var WebLocals = function WebLocals() {
  this.local = window.localStorage;
  this.opts = {
    type: 'd',
    expires: 0,
    encrypt: false,
  };
};
// set local storage item
WebLocals.prototype.set = function set(key, value, opts) {
  if (opts === void 0) opts = this.opts;

  if (!validateParams(key, value)) {
    return;
  }
  if (opts.encrypt);
  else {
    this.local.setItem(key, value2Stringify(value));
  }
};
// get local storage item
WebLocals.prototype.get = function get(key) {
  if (!key && typeof key !== 'string') {
    return undefined;
  }
  return ParseValue(this.local.getItem(key));
};
// update local storage item
WebLocals.prototype.update = function update(key, value, opts) {
  if (opts === void 0) opts = this.opts;

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
WebLocals.prototype.remove = function remove(key) {
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
WebLocals.prototype.key = function key(index) {
  if (typeof index !== 'number') {
    return undefined;
  }
  return this.local.key(index);
};
WebLocals.prototype.clear = function clear() {
  this.local.clear();
};
// sessionStorage 实现类
var WebSessions = function WebSessions() {
  this.session = window.sessionStorage;
  this.opts = {
    type: 'd',
    expires: 0,
    encrypt: false,
  };
};
// set session storage item
WebSessions.prototype.set = function set(key, value, opts) {
  if (opts === void 0) opts = this.opts;

  if (!validateParams(key, value)) {
    return;
  }
  if (opts.encrypt);
  else {
    this.session.setItem(key, value2Stringify(value));
  }
};
// get session storage item
WebSessions.prototype.get = function get(key) {
  if (!key && typeof key !== 'string') {
    return undefined;
  }
  return ParseValue(this.session.getItem(key));
};
// update session storage item
WebSessions.prototype.update = function update(key, value, opts) {
  if (opts === void 0) opts = this.opts;

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
WebSessions.prototype.remove = function remove(key) {
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
WebSessions.prototype.key = function key(index) {
  if (typeof index !== 'number') {
    return undefined;
  }
  return this.session.key(index);
};
WebSessions.prototype.clear = function clear() {
  this.session.clear();
};
// document.cookie 实现类
var WebCookies = function WebCookies() {
  this.opts = {
    type: 'd',
    expires: 0,
    encrypt: false,
    path: '/',
  };
};
// 设置过期时间
WebCookies.prototype.setExpiresTime = function setExpiresTime(type, num) {
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
WebCookies.prototype.set = function set(key, value, opts) {
  if (opts === void 0) opts = this.opts;

  if (!key || !value) {
    return;
  }
  if (typeof key !== 'string' || typeof value !== 'string') {
    return;
  }
  var tempCookie = '';
  if (opts.encrypt);
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
WebCookies.prototype.get = function get(key) {
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
WebCookies.prototype.update = function update(key, value, opts) {
  if (opts === void 0) opts = this.opts;

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
WebCookies.prototype.remove = function remove(key) {
  if (!key && typeof key !== 'string') {
    return undefined;
  }
  var tempCookie = this.get(key);
  document.cookie = key + "=; expires=" + (this.setExpiresTime('all', -1));
  return tempCookie;
};
WebCookies.prototype.key = function key(index) {
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
WebCookies.prototype.clear = function clear() {
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

var install = function (Vue, opts) {

  var webLocals = new WebLocals();
  var webSessions = new WebSessions();
  var webCookies = new WebCookies();
  Object.defineProperty(Vue.prototype, '$webLocals', {
    get: function get() { return webLocals; },
  });
  Object.defineProperty(Vue.prototype, '$webSessions', {
    get: function get() { return webSessions; },
  });
  Object.defineProperty(Vue.prototype, '$webCookies', {
    get: function get() { return webCookies; },
  });
};
var index = { install: install };

module.exports = index;
