import React from "react";
import { UseHttpPropsType, UseHttpReturnType } from "../types";

/**
 * 请求hook
 * @params param { request:请求函数(接受请求参数作为参数)，requestData:请求参数，afterRequest:请求完成回调，cancelRequest:取消请求函数，responsePipe:返回结果转换函数，responseInit:初始默认返回值，autoBy:进入组件自动发起请求的状态依赖(不传则不会自动发起请求) }
 * @returns return { http:执行请求函数，loading:请求加载状态，response:请求返回结果 }
 */
export function useHttp<R = any, D = any, P = R>({
  request,
  requestData,
  afterRequest,
  cancelRequest,
  responsePipe,
  responseInit,
  autoBy,
}: UseHttpPropsType<R, D, P>): UseHttpReturnType<P | undefined> {
  /** 加载状态 */
  const [loading, set_loading] = React.useState<boolean>(false);

  /** 请求结果 */
  const [response, set_response] = React.useState<P | undefined>(responseInit);

  /**
   * 执行请求函数
   */
  function http() {
    set_loading(true);
    request(requestData)
      .then((res) => {
        const finalRes = responsePipe ? responsePipe(res) : (res as any);
        set_response(finalRes);
        afterRequest && afterRequest(res);
      })
      .finally(() => {
        set_loading(false);
      });
  }

  /** 进入组件自动请求 */
  React.useEffect(
    () => {
      if (Array.isArray(autoBy)) {
        http();
      }
      return cancelRequest;
    },
    autoBy ? autoBy : []
  );

  return {
    http,
    loading,
    response,
  };
}
