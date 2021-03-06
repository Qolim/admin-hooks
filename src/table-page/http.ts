/*
 * @Author: LimingQi
 * @Date: 2021-03-07 04:32:04
 * @LastEditTime: 2021-03-07 04:38:43
 * @LastEditors: LimingQi
 * @Description: 列表页面请求hook
 * @FilePath: /admin-hooks/src/table-page/http.ts
 * Github: https://github.com/Qolim
 */

import * as React from "react"
import { PageDataStoreMapKeys } from "."
import { PageDataStoreType, RequestParamsStoreTypes } from "./store"

export function useTablePageHttp<T>({
  requestParamsStore,
  requestPromise,
  set_loading,
  pageDataMap,
  set_pageDataStore,
  updateTimestamp
}: {
  requestParamsStore: RequestParamsStoreTypes
  requestPromise: (requestParams: RequestParamsStoreTypes) => [() => Promise<any>, () => void] | (() => Promise<any>)
  set_loading: (loading: boolean) => void
  pageDataMap: Map<PageDataStoreMapKeys, string>
  set_pageDataStore: (pageData: PageDataStoreType<T>) => void
  updateTimestamp: number
}) {

  /** 监听请求参数状态，发出请求，获取数据并更新 */
  React.useEffect(() => {

    const httpAbout = requestPromise(requestParamsStore)

    const http = Array.isArray(httpAbout) ? httpAbout[0] : httpAbout

    set_loading(true)

    http()
      .then(res => {

        const tableDataKey = pageDataMap.get("tableData") || "tableData";

        const totalKey = pageDataMap.get("total") || "total";

        set_pageDataStore({
          tableData: res[tableDataKey],
          pageNumber: requestParamsStore.pageNumber,
          pageSize: requestParamsStore.pageSize,
          total: res[totalKey],
          other: Object
            .entries(res)
            .filter(item => item[0] !== tableDataKey && item[0] !== totalKey)
            .reduce((pre, cur) => ({ ...pre, [cur[0]]: cur[1] }), {})
        })

      })
      .finally(() => set_loading(false))

    /** 如果参数了请求回收函数，则在组件注销时进行请求回收 */
    if (Array.isArray(httpAbout))
      return httpAbout[1]

  }, [requestParamsStore, updateTimestamp])

}