/*
 * @Author: LimingQi
 * @Date: 2021-03-07 03:25:37
 * @LastEditTime: 2021-03-07 05:26:34
 * @LastEditors: LimingQi
 * @Description:页面显示数据状态hook
 * @FilePath: /admin-hooks/src/table-page/store/page-data.ts
 * Github: https://github.com/Qolim
 */

import * as React from "react";

export interface PageDataStoreType<T> {
  tableData: T[]
  pageNumber: number
  pageSize: number
  total: number
  other: { [name: string]: any }
}

export function usePageDataStore<T = any>(): {
  pageDataStore: PageDataStoreType<T>
  set_pageDataStore: (pageData: PageDataStoreType<T> | ((pageDataStore: PageDataStoreType<T>) => PageDataStoreType<T>)) => void
  // changePageNumber: (pageNumber: number) => void
  // changePageSize: (pageSize: number) => void
} {

  const [
    pageDataStore,
    set_pageDataStore
  ] = React.useState<PageDataStoreType<T>>({
    tableData: [],
    pageNumber: 0,
    pageSize: 0,
    total: 0,
    other: {}
  })

  /**
   * 更新当前页
   * @param pageNumber 当前页
   */
  // function changePageNumber(pageNumber: number) {
  //   set_pageDataStore({
  //     ...pageDataStore,
  //     pageNumber
  //   })
  // }

  /**
   * 更新每页数量
   * @param pageSize 每页数量
   */
  // function changePageSize(pageSize: number) {
  //   set_pageDataStore({
  //     ...pageDataStore,
  //     pageSize
  //   })
  // }

  return {
    pageDataStore,
    set_pageDataStore,
    // changePageNumber,
    // changePageSize
  }

}