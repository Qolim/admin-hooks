/*
 * @Author: LimingQi
 * @Date: 2021-03-07 07:03:40
 * @LastEditTime: 2021-03-10 11:25:30
 * @LastEditors: LimingQi
 * @Description:类型定义文件
 * @FilePath: /admin-hooks/src/types.ts
 * Github: https://github.com/Qolim
 */

export type UseHttpPropsType<R = any, D = any, P = R> = {
  request: (data?: D) => Promise<R>
  requestData?: D
  cancelRequest?: () => void
  afterRequest?: (data?: R) => void
  responsePipe?: (response: R) => P
  responseInit?: P
  autoBy?: any[]
}

export type UseHttpReturnType<R = any> = {
  http: () => void
  response: R
  loading: boolean
}

export type InitGetPageDataRequestParamsStoreTypes = {
  filters?: { [name: string]: any }
  pageNumber?: number
  pageSize?: number
  other?: { [name: string]: any }
}

export type GetPageDataRequestParamsStoreTypes = {
  filters: { [name: string]: any }
  pageNumber: number
  pageSize: number
  other: { [name: string]: any }
}

export type PageDataStoreType<T> = {
  tableData: T[]
  pageNumber: number
  pageSize: number
  total: number
  other: { [name: string]: any }
}

export type RequestsTypes = {
  getDataRequest: GetDataRequestType
  addNewRequest?: AddNewRequestType<any>
}

export type SetRequestParamsStoreType = (requestParams: GetPageDataRequestParamsStoreTypes | ((requestParams: GetPageDataRequestParamsStoreTypes) => GetPageDataRequestParamsStoreTypes)) => void

export type SetLoadingType = (loading: boolean | ((l: boolean) => boolean)) => void

export type GetDataRequestType = (requestParams: GetPageDataRequestParamsStoreTypes) => Promise<any> | [(requestParams: GetPageDataRequestParamsStoreTypes) => Promise<any>, () => void]

export type PageDataMapType = { tableData?: string, total?: string }

export type SetPageDataStoreType<T> = (pageData: PageDataStoreType<T> | ((pageData: PageDataStoreType<T>) => PageDataStoreType<T>)) => void

export type ChangeRequestFiltersType = (f: { [name: string]: any } | ((f: { [name: string]: any }) => { [name: string]: any })) => void

export type ChangeRequestPageType = (n: number | ((n: number) => number)) => void

export type AddNewRequestType<F> = (formData: F) => Promise<any> | [Promise<any>, () => void]

export type UpdateTablePageDataType = () => void

export type SetAddNewFormDataType<F> = (addNewFormDataStore: F | ((addNewFormDataStore: F) => F)) => void

export type GetDetailRequestType<T> = Promise<T>

export type GetDetailRequestsType<T> = GetDetailRequestType<T>[]

export type DeleteRequestType<P, T> = (params: P) => Promise<T>

export type AfterDeleteType = (success: boolean) => void

export type EditRequest<D, T> = (data: D) => Promise<T>

export type ObjesonType = { [name: string]: any }

export type HttpMethodsType = "GET" | "POST" | "DELETE" | "PUT" | "PATCH"
