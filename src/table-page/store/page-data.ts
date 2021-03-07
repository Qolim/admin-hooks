/*
 * @Author: LimingQi
 * @Date: 2021-03-07 03:25:37
 * @LastEditTime: 2021-03-07 08:13:12
 * @LastEditors: LimingQi
 * @Description:页面显示数据状态hook
 * @FilePath: /admin-hooks/src/table-page/store/page-data.ts
 * Github: https://github.com/Qolim
 */

import React from "react";
import { PageDataStoreType, SetPageDataStoreType } from "../../types";

/**
 * 列表页数据管理hook
 * @returns 列表页数据 更新数据函数
 */
export function usePageDataStore<T = any>(): {
  pageDataStore: PageDataStoreType<T>
  set_pageDataStore: SetPageDataStoreType<T>
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

  return {
    pageDataStore,
    set_pageDataStore,
  }

}