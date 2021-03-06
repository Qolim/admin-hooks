/*
 * @Author: LimingQi
 * @Date: 2021-03-07 02:40:45
 * @LastEditTime: 2021-03-07 07:29:55
 * @LastEditors: LimingQi
 * @Description:列表页请求逻辑以及数据管理hook
 * @FilePath: /admin-hooks/src/table-page/index.ts
 * Github: https://github.com/Qolim
 */

import React from "react"
import { useAddNew } from "./add-new"
import { useTablePageHttp } from "./http"
import {
  usePageDataStore,
  useRequestParamsStore,
} from "./store"
import {
  ChangeRequestFiltersType,
  ChangeRequestPageType,
  GetPageDataRequestParamsStoreTypes,
  InitGetPageDataRequestParamsStoreTypes,
  PageDataMapType,
  PageDataStoreType,
  RequestsTypes,
  SetRequestParamsStoreType,
  UpdateTablePageDataType
} from "./types"

/**
 * 列表页请求逻辑以及数据管理hook
 * @param requests 
 * @param pageDataMap 接口返回参数 "tableData" 和 "total"的字段映射
 * @param initRequestParamsStore 初始请求参数配置
 * @returns 列表页状态 以及修改状态的函数
 */
export function useTablePage<T = any>(
  requests: RequestsTypes,
  pageDataMap?: PageDataMapType,
  initRequestParamsStore?: InitGetPageDataRequestParamsStoreTypes
): {
  pageDataStore: PageDataStoreType<T>
  requestParamsStore: GetPageDataRequestParamsStoreTypes
  loading: boolean
  set_requestParamsStore: SetRequestParamsStoreType
  changeRequestFilters: ChangeRequestFiltersType
  changeRequestPageNumber: ChangeRequestPageType
  changeRequestPageSize: ChangeRequestPageType
  changeRequestOther: ChangeRequestFiltersType
  updateTablePageData: UpdateTablePageDataType
} {

  const { getDataRequest } = requests

  /** 请求参数数据相关 */
  const {
    requestParamsStore,
    set_requestParamsStore,
    changeRequestFilters,
    changeRequestPageNumber,
    changeRequestPageSize,
    changeRequestOther
  } = useRequestParamsStore(initRequestParamsStore)

  /** 表格数据相关 */
  const {
    pageDataStore,
    set_pageDataStore,
  } = usePageDataStore<T>()

  // const { } = useAddNew()

  /** 请求加载状态 */
  const [
    loading,
    set_loading
  ] = React.useState(false)

  /** 手动触发更行时间戳 */
  const [
    updateTimestamp,
    set_updateTimestamp
  ] = React.useState<number>(0)

  /** 数据请求kook */
  useTablePageHttp({
    requestParamsStore,
    getDataRequest,
    set_loading,
    pageDataMap,
    set_pageDataStore,
    updateTimestamp
  })

  /**
   * 手动触发表格请求 更新数据
   */
  function updateTablePageData(): void {
    set_updateTimestamp(new Date().valueOf())
  }

  return {
    pageDataStore,
    requestParamsStore,
    loading,
    set_requestParamsStore,
    changeRequestFilters,
    changeRequestPageNumber,
    changeRequestPageSize,
    changeRequestOther,
    updateTablePageData
  }
}
