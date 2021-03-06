/*
 * @Author: LimingQi
 * @Date: 2021-03-07 02:40:45
 * @LastEditTime: 2021-03-07 05:44:38
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
  RequestParamsStoreTypes,
  InitRequestParamsStoreTypes,
  PageDataStoreType,
} from "./store"

/**
 * 列表页请求逻辑以及数据管理hook
 * @param requestPromise 执行请求的函数 接受请求参数数据 返回一个元祖[请求函数(返回一个promise),注销请求函数]或者只返回一个请求函数(返回一个promise)
 * @param pageDataMap 接口返回参数 "tableData" 和 "total"的字段映射
 * @param initRequestParamsStore 初始请求参数配置
 * @returns 列表页状态 以及修改状态的函数
 */
export function useTablePage<T = any>(
  requestPromise: (requestParams: RequestParamsStoreTypes) => [Promise<any>, () => void] | (Promise<any>),
  pageDataMap?: { tableData?: string, total?: string },
  initRequestParamsStore?: InitRequestParamsStoreTypes
): {
  pageDataStore: PageDataStoreType<T>
  requestParamsStore: RequestParamsStoreTypes
  loading: boolean
  set_requestParamsStore: (requestParams: RequestParamsStoreTypes | ((requestParams: RequestParamsStoreTypes) => RequestParamsStoreTypes)) => void
  changeRequestFilters: (filters: { [name: string]: any } | ((filters: { [name: string]: any }) => { [name: string]: any })) => void
  changeRequestPageNumber: (pageNumber: number | ((pageNumber: number) => number)) => void
  changeRequestPageSize: (pageNumber: number | ((pageNumber: number) => number)) => void
  changeRequestOther: (other: { [name: string]: any } | ((other: { [name: string]: any }) => { [name: string]: any })) => void
  updateTablePageData: () => void
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
    requestPromise,
    set_loading,
    pageDataMap,
    set_pageDataStore,
    updateTimestamp
  })

  /**
   * 手动触发表格请求 更新数据
   */
  function updateTablePageData() {
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
