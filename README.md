# admin-hooks
hooks for admin systom with react

## use
npm i admin-hooks -S

## api
* useTablePage

```typescript
  const {
    // 表格数据 
    pageDataStore,
    // 请求参数数据
    requestParamsStore,
    // 请求加载状态
    loading,
    // 更新请求参数数据（全部）
    set_requestParamsStore,
    // 更新检索请求参数
    changeRequestFilters,
    // 更新请求页参数
    changeRequestPageNumber,
    // 更新请求每页数量参数
    changeRequestPageSize,
    // 更新其他请求参数
    changeRequestOther,
    // 手动重新发起请求（使用状态中的请求参数）
    updateTablePageData
  } = useTablePage<
    // 每项列表数据的类型定义 默认any
    { name: string }
  >(
    // 第一个参数为请求函数
    (
      // 状态中的请求参数
      params
    ) =>
      // 返回一个Promise 只会处理Promise.then 错误请在返回Promise之前过滤处理
      new Promise((resolve, reject) => {
        // ...
      }) |
      //或者返回一个元祖
      [
        // 第一项为请求的Promise
        new Promise((resolve, reject) => {
          // ...
        }),
        //第二项为注销请求的函数
        ()=>{
          //...
        }
      ]
      ,
    // 第二个参数为接口返回数据到 pageDataStore(表格数据) 的字段映射 不传使用默认
    {
      // 列表数据字段 默认"tableData"
      tableData: "list",
      // 总数据量 默认"total"
      total: "total"
    },
    // 第三个参数为初始请求参数 不传使用默认
    {
      // 检索条件 默认{}
      filters: {},
      // 检索页 默认1
      pageNumber: 1,
      // 检索每页数量 默认 10
      pageSize: 10,
      // 其他 默认{}
      other: {}
    }
  )
```
