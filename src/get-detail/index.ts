/*
 * @Author: LimingQi
 * @Date: 2021-03-09 12:20:03
 * @LastEditTime: 2021-03-09 12:58:31
 * @LastEditors: LimingQi
 * @Description: 详情
 * @FilePath: /admin-hooks/src/get-detail/index.ts
 * Github: https://github.com/Qolim
 */

import React from "react";
import { GetDetailRequestsType, GetDetailRequestType } from "../types";


export function useGetDetail<D extends Object = { [name: string]: any }>(
  request: GetDetailRequestType<D> | GetDetailRequestsType<D>,
  clearRequest?: () => void
): [D, boolean] {

  const [details, set_details] = React.useState<D>({} as any)

  const [loading, set_loading] = React.useState<boolean>(false)

  React.useEffect(() => {

    (async function () {
      let data: D = {} as any
      set_loading(true)
      if (Array.isArray(request)) {
        for (let i = 0; i < request.length; i++) {
          const res = await request[i]
          data = { ...data, ...res }
        }
      } else {
        const res = await request
        data = { ...data, ...res }
      }
      set_details(data)
      set_loading(false)
    })()

    return clearRequest
  }, [])

  return [details, loading]

}