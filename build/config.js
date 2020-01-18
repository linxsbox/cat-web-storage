const path = require('path'); // nodejs 路径
const buble = require('@rollup/plugin-buble'); // Convert ES2015 with buble. 将 ES6+ 代码编译成 ES2015 标准
const cjs = require('@rollup/plugin-commonjs'); // commonjs 模块标准支持
const rplc = require('@rollup/plugin-replace'); // 编译过程中动态替换代码中的内容
const nresolve = require('@rollup/plugin-node-resolve'); // 编译过程中帮助 rollup 查找外部的模块并支持合并
const flow = require('rollup-plugin-flow-no-whitespace'); // 编译过程中 将 flow 静态类型检查进行忽略
const rts = require('rollup-plugin-typescript2'); // 将 TypeScript 转换成为 ES6+ 标准
const version = require('../package.json').version; // 版本号
const license = require('../package.json').license; // 开源协议
const banner = // 版本信息 & 作者 & 开源协议
`/*!
 * web-storage v${version}
 * Author: Lin.xs | Email: yunfax@outlook.com
 * (c) ${new Date().getFullYear()} Lin.xs
 * @license ${license}
 */`;

const resolve = _path => path.resolve(__dirname, '../', _path);

const configs = [
  { // dev
    file: resolve('dist/web-storage.js'),
    format: 'umd',
    env: 'development'
  },
  { // prd
    file: resolve('dist/web-storage.min.js'),
    format: 'umd',
    env: 'production'
  },
  { // commonjs dev
    file: resolve('dist/web-storage.common.js'),
    format: 'cjs',
    env: 'development'
  },
  { // commonjs prd
    file: resolve('dist/web-storage.common.min.js'),
    format: 'cjs',
    env: 'production'
  },
  { // es dev
    file: resolve('dist/web-storage.esm.js'),
    format: 'es',
    env: 'development'
  },
  { // es prd
    file: resolve('dist/web-storage.esm.min.js'),
    format: 'es',
    env: 'production'
  },
].map(buildConfig);

function buildConfig(item) {
  const input = {
    input: resolve('src/index.ts'),
    plugins: [
      rts({
        tsconfig: resolve('tsconfig.json')
      }),
      flow(),
      nresolve(),
      cjs(),
      rplc({
        __VERSION__: version
      }),
      buble()
    ]
  };
  const output = {
    file: item.file,
    format: item.format,
    banner,
    name: 'WebStorage',
    indent: ' '
  };

  if (item.env) {
    input.plugins.unshift(rplc({
      'process.env.NODE_ENV': JSON.stringify(item.env)
    }));
  }

  return {
    input,
    output
  };
}

module.exports = configs;