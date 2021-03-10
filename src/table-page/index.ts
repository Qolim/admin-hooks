/*
 * @Author: LimingQi
 * @Date: 2021-03-07 02:40:45
 * @LastEditTime: 2021-03-10 11:34:48
 * @LastEditors: LimingQi
 * @Description:列表页请求逻辑以及数据管理hook
 * @FilePath: /admin-hooks/src/table-page/index.ts
 * Github: https://github.com/Qolim
 */

import React from "react";
import { useHttp } from "..";
import { useRequestParamsStore } from "./store";
import {
  ChangeRequestFiltersType,
  ChangeRequestPageType,
  GetDataRequestType,
  GetPageDataRequestParamsStoreTypes,
  InitGetPageDataRequestParamsStoreTypes,
  PageDataMapType,
  PageDataStoreType,
  SetRequestParamsStoreType,
  UpdateTablePageDataType
} from "../types";

/**
 * 列表页请求逻辑以及数据管理hook
 * @param request 请求数据函数(只会处理Promise.then 错误请在返回Promise之前过滤处理)接受请求参数返回一个请求Promise，或者[请求函数,注销请求函数]的元祖
 * @param pageDataMap 接口返回参数 "tableData" 和 "total"的字段映射
 * @param initRequestParamsStore 初始请求参数配置
 * @returns 列表页状态 以及修改状态的函数
 */
export function useTablePage<T = any>(
  request: GetDataRequestType,
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


  /** 手动触发更行时间戳 */
  const [
    updateTimestamp,
    set_updateTimestamp
  ] = React.useState<number>(0)


  /** 初始页面数据 */
  const initPageData = {
    tableData: [],
    pageNumber: 0,
    pageSize: 0,
    total: 0,
    other: {}
  }

  /** 请求结果转换函数 */
  const responsePipe = (res: any) => {
    pageDataMap = pageDataMap || {}
    const tableDataKey = pageDataMap.tableData || "tableData";
    const totalKey = pageDataMap.total || "total";
    return {
      tableData: res[tableDataKey],
      pageNumber: requestParamsStore.pageNumber,
      pageSize: requestParamsStore.pageSize,
      total: res[totalKey],
      other: Object.entries(res)
        .filter(item => item[0] !== tableDataKey && item[0] !== totalKey)
        .reduce((pre, cur) => ({ ...pre, [cur[0]]: cur[1] }), {})
    }
  }

  /** 请求 */
  const {
    response: pageDataStore,
    loading
  }: any = useHttp<
    any,
    GetPageDataRequestParamsStoreTypes,
    PageDataStoreType<T>
  >({
    request: Array.isArray(request) ? request[0] : request,
    requestData: requestParamsStore,
    cancelRequest: Array.isArray(request) ? request[1] : undefined,
    autoBy: [requestParamsStore, updateTimestamp],
    responsePipe,
    responseInit: initPageData
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
