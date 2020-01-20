# web-storage
web storage

## install

```bash
npm i cat-web-storage -S
```

**main**
```javascript
import webstorage from 'cat-web-storage';
Vue.use(webstorage);
```

## Usage
**interface**
- WebStorage

**function**
- [set](#set)
- [get](#get)
- [remove](#remove)
- [key](#key)
- [clear](#clear)

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

## See also
目前需要在 **Vue** 实例下使用。

### <a id="#set"></a> set (key: string, value: any, opts?: Options): void

```javascript
created () {
  this.$localStorage.set('number', 10086);

  this.$localStorage.set('string', '从前有座山……');

  this.$localStorage.set('object', {'移动客服': 10086});

  this.$localStorage.set('array', [10086, 10000, 10001, '小灵通？']);
}
```

### <a id="#get"></a> get (key: string): object | string

获取 web storage 时会尝试将存储时的数据类型还原，如果还原失败会返回**字符串**或 **undefined**。

```javascript
created () {
  this.$localStorage.get('number');

  this.$localStorage.get('string');

  this.$localStorage.get('object');

  this.$localStorage.get('array');
}
```

### <a id="#remove"></a> remove (key: string): object | string

将指定 **key** 的存储项从列表中移除。

```javascript
created () {
  this.$localStorage.remove('array');
}
```

### <a id="#key"></a> key (index: number): string

通过下标的方式获取存储列表中的项。但是，存储列表的顺序并非以存储时的顺序作为排序，所以使用此函数时可能不会返回期望的数据。

```javascript
created () {
  this.$localStorage.key(1);

  this.$localStorage.key(4);
}
```

### <a id="#clear"></a> clear (): void

将存储列表全部清除。

```javascript
created () {
  this.$localStorage.clear();
}
```
