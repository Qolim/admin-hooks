/*
 * @Author: LimingQi
 * @Date: 2021-03-07 04:32:04
 * @LastEditTime: 2021-03-07 07:20:13
 * @LastEditors: LimingQi
 * @Description: 列表页面请求hook
 * @FilePath: /admin-hooks/src/table-page/http.ts
 * Github: https://github.com/Qolim
 */

import React from "react"
import {
  GetDataRequestType,
  GetPageDataRequestParamsStoreTypes,
  PageDataMapType,
  SetLoadingType,
  SetPageDataStoreType
} from "../types"

export function useTablePageHttp<T>({
  requestParamsStore,
  getDataRequest,
  set_loading,
  pageDataMap = {},
  set_pageDataStore,
  updateTimestamp
}: {
  requestParamsStore: GetPageDataRequestParamsStoreTypes
  getDataRequest: GetDataRequestType
  set_loading: SetLoadingType
  pageDataMap?: PageDataMapType,
  set_pageDataStore: SetPageDataStoreType<T>
  updateTimestamp: number
}) {

  /** 监听请求参数状态，发出请求，获取数据并更新 */
  React.useEffect(
    () => {

      set_loading(true)
      const httpAbout = getDataRequest(requestParamsStore)
      const promise = Array.isArray(httpAbout) ? httpAbout[0] : httpAbout

      promise.then(res => {
        const tableDataKey = pageDataMap.tableData || "tableData";
        const totalKey = pageDataMap.total || "total";
        set_pageDataStore({
          tableData: res[tableDataKey],
          pageNumber: requestParamsStore.pageNumber,
          pageSize: requestParamsStore.pageSize,
          total: res[totalKey],
          other: Object.entries(res)
            .filter(item => item[0] !== tableDataKey && item[0] !== totalKey)
            .reduce((pre, cur) => ({ ...pre, [cur[0]]: cur[1] }), {})
        })
      })
        .finally(() => set_loading(false))

      /** 如果传入了请求回收函数，则在组件注销时进行请求回收 */
      if (Array.isArray(httpAbout)) {
        return httpAbout[1]
      }

    },
    [
      requestParamsStore,
      updateTimestamp
    ]
  )

}