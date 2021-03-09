/*
 * @Author: LimingQi
 * @Date: 2021-03-09 13:01:16
 * @LastEditTime: 2021-03-09 13:17:44
 * @LastEditors: LimingQi
 * @Description: 修改
 * @FilePath: /admin-hooks/src/edit/index.ts
 * Github: https://github.com/Qolim
 */

import React from "react";
import { useGetDetail } from "../get-detail";
import { EditRequest, GetDetailRequestsType, GetDetailRequestType } from "../types";


export function useEdit<D = any, T = any>(
  getDetailRequest: GetDetailRequestType<D> | GetDetailRequestsType<D>,
  editRequest: EditRequest<D, T>,
  afterEdit?: (success: boolean) => void
): {
  editAction: (data: D) => void
  editLoading: boolean,
  details: D,
  detailLoading: boolean
} {

  const [loading, set_loading] = React.useState<boolean>(false)

  const [details, detailLoading] = useGetDetail(getDetailRequest)


  /**
   * 执行编辑函数
   * @param data 
   */
  function editAction(data: D) {
    editRequest(data).then(() => {
      afterEdit && afterEdit(true)
    }).catch(() => {
      afterEdit && afterEdit(false)
    }).finally(
      () => { set_loading(false) }
    )
  }

  return {
    editAction,
    editLoading: loading,
    details,
    detailLoading
  }

}