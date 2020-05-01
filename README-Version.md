# cat-web-storage 版本说明

现有版本说明
## ver 0.2.0
新增对于非 Vue 环境的支持，以及对部分函数判断的暂时性完善逻辑。

- 支持以 script 标签直接引入方式
- 兼容性 >= IE 9
- 修复调用加密方式的赋值逻辑，但加密函数未实现

**function list** <span style="padding:1px 6px;color:#fff;font-size:14px;background-color:#ccc;border-radius:4px;">Unchanged</span>
- [set](README.md#set)
- [get](README.md#get)
- [remove](README.md#remove)
- [key](README.md#key)
- [clear](README.md#clear)
---

## ver 0.1.11
实现对 Web storage API 的基础封装，基于 Vue 环境。

- 需要在 **Vue** 实例下使用
- 引入式 **Vue** 实现自动注册 use

**function list** <span style="padding:1px 6px;color:#fff;font-size:14px;background-color:#28a745;border-radius:4px;">basic</span>
- [set](README.md#set)
- [get](README.md#get)
- [remove](README.md#remove)
- [key](README.md#key)
- [clear](README.md#clear)
---