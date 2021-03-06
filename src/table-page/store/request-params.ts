/*
 * @Author: LimingQi
 * @Date: 2021-03-07 03:04:05
 * @LastEditTime: 2021-03-07 04:17:39
 * @LastEditors: LimingQi
 * @Description:列表页请求参数状态集合
 * @FilePath: /admin-hooks/src/table-page/store/request-params.ts
 * Github: https://github.com/Qolim
 */
import React from "react"

export interface InitRequestParamsStoreTypes {
  filters: { [name: string]: any }
  pageNumber?: number
  pageSize?: number
  other?: { [name: string]: any }
}

export interface RequestParamsStoreTypes {
  filters: { [name: string]: any }
  pageNumber: number
  pageSize: number
  other: { [name: string]: any }
}


/**
 * 请求参数状态管理hook
 * @param initRequestParamsStore 初始请求参数数
 * @returns 请求参数状态、以及相关更新方法
 */
export function useRequestParamsStore(
  initRequestParamsStore?: InitRequestParamsStoreTypes
): {
  requestParamsStore: RequestParamsStoreTypes
  set_requestParamsStore: (requestParams: RequestParamsStoreTypes) => void
  changeRequestFilters: (filters: { [name: string]: any }) => void
  changeRequestPageNumber: (pageNumber: number) => void
  changeRequestPageSize: (pageSize: number) => void
  changeRequestOther: (other: { [name: string]: any }) => void
} {

  /** 默认初始参数 */
  initRequestParamsStore = initRequestParamsStore || {
    filters: {},
    pageNumber: 1,
    pageSize: 10,
    other: {}
  }

  /** 请求参数状态 */
  const [
    requestParamsStore,
    set_requestParamsStore
  ] = React.useState<RequestParamsStoreTypes>({
    filters: initRequestParamsStore.filters,
    pageNumber: initRequestParamsStore.pageNumber || 1,
    pageSize: initRequestParamsStore.pageSize || 10,
    other: initRequestParamsStore.other || {}
  })

  /**
   * 更新请求检索项
   * @param filters 更新后的检索项
   */
  function changeRequestFilters(filters: { [name: string]: any }) {
    set_requestParamsStore({
      ...requestParamsStore,
      filters
    })
  }

  /**
   * 更新请求页
   * @param pageNumber 更新后的请求页
   */
  function changeRequestPageNumber(pageNumber: number) {
    set_requestParamsStore({
      ...requestParamsStore,
      pageNumber
    })
  }

  /**
   * 更新请求每页数量
   * @param pageSize 更新后的每页数量
   */
  function changeRequestPageSize(pageSize: number) {
    set_requestParamsStore({
      ...requestParamsStore,
      pageSize
    })
  }

  /**
   * 更新其他请求参数
   * @param other 跟新后的其他请求参数
   */
  function changeRequestOther(other: { [name: string]: any }) {
    set_requestParamsStore({
      ...requestParamsStore,
      other
    })
  }

  return {
    requestParamsStore,
    set_requestParamsStore,
    changeRequestFilters,
    changeRequestPageNumber,
    changeRequestPageSize,
    changeRequestOther
  }


}