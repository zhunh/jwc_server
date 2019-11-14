# 基本状态数据库接口文档

## 登录

- 请求方式：POST
- 请求地址：http://localhost:3000/api/login
- 请求参数：
    | 参数名 | 是否必须 | 参数描述 |
    | ----- | ----- | ----- |
    | name | Y | 用户名 |
    | password | Y | 密码 |

- 响应格式
```js
{
    code:200,
    msg:'ok',
    data:[
        { id:01,item:apple },
        { id:02,item:orange },
        { id:03,item:banana },
    ]
}
```
## 注册

## 专业信息列表获取

- 请求方式：GET
- 请求地址：http://localhost:3000/api/getMajorInfo
- 请求参数：
    | 参数名 | 是否必须 | 参数描述 | 默认值 |
    | ----- | ------ | --------- | --- |
    | pageNum | N | 请求第几页 | 1 |
    | pageSize | N | 每页显示几条 | 10 |
    |searchName | N | 搜索关键字 | 空 |
    | sort | N | 排序关键字 | aec |
- 返回
```js
{
    code: 0,
    msg: 'ok',
    data: {
        list: [],
        totalPage: 10
    }
}
```
