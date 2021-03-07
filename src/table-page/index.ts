/*
 * @Author: LimingQi
 * @Date: 2021-03-07 02:40:45
 * @LastEditTime: 2021-03-07 08:28:50
 * @LastEditors: LimingQi
 * @Description:列表页请求逻辑以及数据管理hook
 * @FilePath: /admin-hooks/src/table-page/index.ts
 * Github: https://github.com/Qolim
 */

import React from "react"
import { useTablePageHttp } from "./http"
import {
  usePageDataStore,
  useRequestParamsStore,
} from "./store"
import {
  ChangeRequestFiltersType,
  ChangeRequestPageType,
  GetDataRequestType,
  GetPageDataRequestParamsStoreTypes,
  InitGetPageDataRequestParamsStoreTypes,
  PageDataMapType,
  PageDataStoreType,
  RequestsTypes,
  SetAddNewFormDataType,
  SetRequestParamsStoreType,
  UpdateTablePageDataType
} from "../types"

/**
 * 列表页请求逻辑以及数据管理hook
 * @param getDataRequest 请求数据函数(只会处理Promise.then 错误请在返回Promise之前过滤处理) 接受请求参数 返回一个请求Promise或者[请求Promise,注销请求函数]的元祖
 * @param pageDataMap 接口返回参数 "tableData" 和 "total"的字段映射
 * @param initRequestParamsStore 初始请求参数配置
 * @returns 列表页状态 以及修改状态的函数
 */
export function useTablePage<T = any>(
  getDataRequest: GetDataRequestType,
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
    updateTablePageData,
  }
}
