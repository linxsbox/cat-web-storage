# web-storage
**cat-web-storage** 是一个轻量级的 Web 存储工具库，它对 web storage API 进行了封装，简化了所需额外编码处理存储数据的操作。
未来将会支持加密存储和可接受自定义加密函数，以及对 IndexedDB 的支持。

[版本说明](/linxsbox/cat-web-storage/blob/dev/README-Version.md)

## install

```bash
npm i cat-web-storage -S
```

**main**
```javascript
import webstorage from 'cat-web-storage';
Vue.use(webstorage);
```

---

## Usage
**interface**
- WebStorage

**function**
- [set](#-set-key-string-object--string)
- [get](#-get-key-string-object--string)
- [remove](#-remove-key-string-object--string)
- [key](#-key-key-string-object--string)
- [clear](#-clear-key-string-object--string)

```ts
// 实现 WebStorage
class LocalStorage implements WebStorage { ... }
class SessionStorage implements WebStorage { ... }
class CookieStorage implements WebStorage { ... }

// 类型定义
declare module {
  interface Vue {
    $localStorage: LocalStorage
    $sessionStorage: SessionStorage
    $cookieStorage: CookieStorage
  }
} 
```

---

## See also

### <a id="#set"></a> set (key: string, value: any, opts?: Options): void

```javascript
// Vue
this.$localStorage.set('number', 10086);

this.$localStorage.set('string', '从前有座山……');

this.$localStorage.set('object', {'移动客服': 10086});

this.$localStorage.set('array', [10086, 10000, 10001, '小灵通？']);

// window
window.$localStorage.set('array', [10086, 10000, 10001, '小灵通？']);
```

### <a id="#get"></a> get (key: string): object | string

获取 web storage 时会尝试将存储时的数据类型还原，如果还原失败会返回**字符串**或 **undefined**。

```javascript
// Vue
this.$localStorage.get('number');

this.$localStorage.get('string');

this.$localStorage.get('object');

this.$localStorage.get('array');

// window
window.$localStorage.get('array');
```

### <a id="#remove"></a> remove (key: string): object | string

将指定 **key** 的存储项从列表中移除。

```javascript
// Vue
this.$localStorage.remove('array');

// window
window.$localStorage.remove('array');
```

### <a id="#key"></a> key (index: number): string

通过下标的方式获取存储列表中的项。但是，存储列表的顺序并非以存储时的顺序作为排序，所以使用此函数时可能不会返回期望的数据。

```javascript
// Vue
this.$localStorage.key(1);

this.$localStorage.key(4);

// window
window.$localStorage.key(1);
```

### <a id="#clear"></a> clear (): void

此函数会将存储列表全部清除。请谨慎使用。

```javascript
// Vue
this.$localStorage.clear();

// window
window.$localStorage.clear();
```
