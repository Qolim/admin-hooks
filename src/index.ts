/*
 * @Author: LimingQi
 * @Date: 2021-03-06 03:39:04
 * @LastEditTime: 2021-03-09 13:04:32
 * @LastEditors: LimingQi
 * @Description:入口文件
 * @FilePath: /admin-hooks/src/index.ts
 * Github: https://github.com/Qolim
 */
import { useAddNew } from "./add-new";
import { useDelete } from "./delete";
import { useGetDetail } from "./get-detail";
import { useTablePage } from "./table-page";

export {
  useTablePage,
  useAddNew,
  useGetDetail,
  useDelete
}