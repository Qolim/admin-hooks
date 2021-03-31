import React from "react";
import {
  ChangeRequestFiltersType,
  ChangeRequestPageType,
  GetPageDataRequestParamsStoreTypes,
  InitGetPageDataRequestParamsStoreTypes,
  SetRequestParamsStoreType,
} from "../../types";

/**
 * 请求参数状态管理hook
 * @param initRequestParamsStore 初始请求参数数
 * @returns 请求参数状态、以及相关更新方法
 */
export function useRequestParamsStore(
  initRequestParamsStore?: InitGetPageDataRequestParamsStoreTypes
): {
  requestParamsStore: GetPageDataRequestParamsStoreTypes;
  set_requestParamsStore: SetRequestParamsStoreType;
  changeRequestFilters: ChangeRequestFiltersType;
  changeRequestPageNumber: ChangeRequestPageType;
  changeRequestPageSize: ChangeRequestPageType;
  changeRequestOther: ChangeRequestFiltersType;
} {
  /** 默认初始参数 */
  initRequestParamsStore = initRequestParamsStore || {
    filters: {},
    pageNumber: 1,
    pageSize: 10,
    other: {},
  };

  /** 请求参数状态 */
  const [
    requestParamsStore,
    set_requestParamsStore,
  ] = React.useState<GetPageDataRequestParamsStoreTypes>({
    filters: initRequestParamsStore.filters || {},
    pageNumber: initRequestParamsStore.pageNumber || 1,
    pageSize: initRequestParamsStore.pageSize || 10,
    other: initRequestParamsStore.other || {},
  });

  /**
   * 更新请求检索项
   * @param filters 更新后的检索项
   */
  const changeRequestFilters = React.useCallback(
    (
      filters:
        | { [name: string]: any }
        | ((f: { [name: string]: any }) => { [name: string]: any })
    ) => {
      if (typeof filters === "function") {
        set_requestParamsStore((s) => ({
          ...s,
          filters: filters(s.filters),
        }));
      } else {
        set_requestParamsStore((s) => ({
          ...s,
          filters,
        }));
      }
    },
    []
  );

  /**
   * 更新请求页
   * @param pageNumber 更新后的请求页
   */
  const changeRequestPageNumber = React.useCallback(
    (pageNumber: number | ((p: number) => number)) => {
      if (typeof pageNumber === "function") {
        set_requestParamsStore((s) => ({
          ...s,
          pageNumber: pageNumber(s.pageNumber),
        }));
      } else {
        set_requestParamsStore((s) => ({
          ...s,
          pageNumber,
        }));
      }
    },
    []
  );

  /**
   * 更新请求每页数量
   * @param pageSize 更新后的每页数量
   */
  const changeRequestPageSize = React.useCallback(
    (pageSize: number | ((p: number) => number)) => {
      if (typeof pageSize === "function") {
        set_requestParamsStore((s) => ({
          ...s,
          pageSize: pageSize(s.pageSize),
        }));
      } else {
        set_requestParamsStore((s) => ({
          ...s,
          pageSize,
        }));
      }
    },
    []
  );

  /**
   * 更新其他请求参数
   * @param other 跟新后的其他请求参数
   */
  const changeRequestOther = React.useCallback(
    (
      other:
        | { [name: string]: any }
        | ((o: { [name: string]: any }) => { [name: string]: any })
    ) => {
      if (typeof other === "function") {
        set_requestParamsStore((s) => ({
          ...s,
          other: other(s.other),
        }));
      } else {
        set_requestParamsStore((s) => ({
          ...s,
          other,
        }));
      }
    },
    []
  );

  return {
    requestParamsStore,
    set_requestParamsStore,
    changeRequestFilters,
    changeRequestPageNumber,
    changeRequestPageSize,
    changeRequestOther,
  };
}
