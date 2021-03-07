/*
 * @Author: LimingQi
 * @Date: 2021-03-07 06:30:36
 * @LastEditTime: 2021-03-07 08:25:22
 * @LastEditors: LimingQi
 * @Description: 新增功能
 * @FilePath: /admin-hooks/src/add-new/index.ts
 * Github: https://github.com/Qolim
 */

import React from "react";
import {
  AddNewRequestType,
  AfterRequestType,
  SetAddNewFormDataType
} from "../types";

/**
 * 新增功能hook
 * @param addNewRequest 请求请求函数 接受formData作为参数 返回一个Promise或者[Promise,注销请求函数]的元祖
 * @param afterRequest 请求结束后执行的函数(.then中的回调,错误处理需自行在addNewRequest中处理) 接受Promise.then中的res作为参数
 * @returns 返回请求加载状态 新增函数(传入新增表单) 新增表单 
 */
export function useAddNew<F = any, R = any>(
  addNewRequest: AddNewRequestType<F>,
  afterRequest?: AfterRequestType<R>
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
        .then((res: R) => {
          afterRequest && afterRequest(res)
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