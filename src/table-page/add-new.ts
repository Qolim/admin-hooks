/*
 * @Author: LimingQi
 * @Date: 2021-03-07 06:30:36
 * @LastEditTime: 2021-03-07 07:28:12
 * @LastEditors: LimingQi
 * @Description: 新增
 * @FilePath: /admin-hooks/src/table-page/add-new.ts
 * Github: https://github.com/Qolim
 */

import React from "react";
import { AddNewRequestType, SetAddNewFormDataType, UpdateTablePageDataType } from "./types";

/**
 * 新增请求
 * @param addNewRequest 请求请求函数 接受formData作为参数 返回一个Promise或者[Promise,注销请求函数]的元祖
 * @param updateTablePageData 跟新列表页函数
 * @returns 返回请求加载状态 新增函数(传入新增表单) 新增表单 
 */
export function useAddNew<F = any>(
  addNewRequest: AddNewRequestType<F>,
  updateTablePageData: UpdateTablePageDataType
): {
  addNewLoading: boolean
  addNew: SetAddNewFormDataType<F>
  addNewFormDataStore: F | undefined
} {

  const [addNewFormDataStore, set_addNewFormData] = React.useState<F | undefined>(undefined)

  const [loading, set_loading] = React.useState<boolean>(false)


  /** 监听addNewFormData状态 执行新增请求 */
  React.useEffect(() => {
    if (addNewFormDataStore !== undefined) {

      set_loading(true)

      const httpAbout = addNewRequest(addNewFormDataStore)
      const promise = Array.isArray(httpAbout) ? httpAbout[0] : httpAbout

      promise
        .then(() => {
          updateTablePageData()
        })
        .finally(() => set_loading(false))

      /** 如果传入了请求回收函数，则在组件注销时进行请求回收 */
      if (Array.isArray(httpAbout)) {
        return httpAbout[1]
      }
    }
  }, [addNewFormDataStore])

  return {
    addNewLoading: loading,
    addNew: set_addNewFormData as any,
    addNewFormDataStore
  }

}