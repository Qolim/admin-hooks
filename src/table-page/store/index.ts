/*
 * @Author: LimingQi
 * @Date: 2021-03-07 02:44:09
 * @LastEditTime: 2021-03-07 04:17:48
 * @LastEditors: LimingQi
 * @Description: 状态导出
 * @FilePath: /admin-hooks/src/table-page/store/index.ts
 * Github: https://github.com/Qolim
 */

import { PageDataStoreType, usePageDataStore } from "./page-data";
import { InitRequestParamsStoreTypes, RequestParamsStoreTypes, useRequestParamsStore } from "./request-params";

export {
  usePageDataStore,
  useRequestParamsStore,
  InitRequestParamsStoreTypes,
  RequestParamsStoreTypes,
  PageDataStoreType
}