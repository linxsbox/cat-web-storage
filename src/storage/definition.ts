// 定义 web 存储的接口
export interface WebStorage {
  set (key: string, value: any, opts?: Options): void;
  get (key: string): object | string | undefined;
  update (key: string, value: any, opts?: Options): object | string | undefined;
  remove (key: string): object | string | undefined;
  key (index: number): string | undefined;
  clear (): void;
}

// 定义额外参数接口
export interface Options {
  type?: string;
  expires?: number;
  encrypt?: boolean;
}

/**
 * 存储值转换成字符串
 * @param value 
 */
export function value2Stringify (value: any) {
  return typeof value === 'string'
    ? value : typeof value === 'object'
      ? Array.isArray(value) ? `[${value.toString()}]` : JSON.stringify(value)
      : value.toString();
}

/**
 * 解析存储的值
 * @param value 
 */
export function ParseValue (value: any) {
  if (!value) { return; }
  const tempLen = value.length;
  const tempLenEnd = tempLen - 1;
  const strMatch = (val = '', strArr: string[]) => {
    return value.indexOf(strArr[0]) === 0 && val.indexOf(strArr[1]) === tempLenEnd;
  };

  if (strMatch(value, ['{', '}'])) {
    return JSON.parse(value);
  } else if (strMatch(value, ['[', ']'])) {
    return value.substr(1, tempLenEnd - 1).split(',');
  } else {
    return value;
  }
}

/**
 * 验证存储参数
 * @param key 
 * @param value 
 */
export function validateParams (key?: string, value?: any): boolean {
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
