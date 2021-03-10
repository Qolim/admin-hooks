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
      })
    // //或者 一个元祖
    // [
    // // 第一项为请求函数
    // (params) => new Promise((resolve, reject) => {
    //   // ...
    // }),
    // //第二项为注销请求的函数
    // () => {
    //   //...
    // }
    // ]
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

* useHttp

```typescript
 const {
  //http执行函数
  http,
  //请求返回值 (若传入responsePipe 则为转换后的值)
  response,
  //请求加载状态
  loading,
 } = useHttp<
  // respinse类型定义 默认any
  R,
  //requestData类型定义 默认any
  D,
  //responsePipe转换后的response 默认R
  P
 >({ 
  //请求函数(接受请求参数作为参数)
  request:(data?:D)=>Promise<R>,
  //请求参数
  requestData?:D,
  //请求完成回调
  afterRequest?:()=>void,
  //取消请求函数
  cancelRequest?:()=>void,
  //返回结果转换函数
  responsePipe?:(res:R)=>P,
  //初始默认返回值
  responseInit?:P,
  //进入组件自动发起请求的状态依赖(不传则不会自动发起请求)
  autoBy?:any[]
})
```

* useAction
```typescript
  const [handle,state] = useAction<
  // 状态值类型默认 any
  S，
  // 执行函数接受的参数列表
  E
  >(
    // 第一个参数为事件函数 接受上一个state为参数 返回一个新的state
    action:(state:S)=>S,
    // 第二个参数为初始state值
    initState:S
  )=>(
    // 返回一个数组
    [
      //第一项为执行函数
      handle:(...args:E)=>void,
      // 第二项为状态值
      state:S
    ]
  )
```
