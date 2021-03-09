/*
 * @Author: LimingQi
 * @Date: 2021-03-09 12:36:48
 * @LastEditTime: 2021-03-09 13:11:54
 * @LastEditors: LimingQi
 * @Description: 删除
 * @FilePath: /admin-hooks/src/delete/index.ts
 * Github: https://github.com/Qolim
 */

import React from "react";
import { AfterDeleteType, DeleteRequestType } from "../types";

export function useDelete<P = any, R = any>(
  request: DeleteRequestType<P, R>,
  afterDelete?: AfterDeleteType
): [(params: P) => void, boolean] {

  const [loading, set_loading] = React.useState(false)

  /**
   * 执行函数删除
   * @param params request接受的参数
   */
  function deleteAction(params: P) {
    set_loading(true)
    request(params).then(res => {
      afterDelete && afterDelete(true)
    }).
      catch(() => {
        afterDelete && afterDelete(false)
      }).
      finally(() => {
        set_loading(false)
      })
  }

  return [deleteAction, loading]
}