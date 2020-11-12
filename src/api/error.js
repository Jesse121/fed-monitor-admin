import request from "@/utils/request";

export const getErrorData = params =>
  request({
    url: "/error/getErrorData",
    method: "get",
    params
  });

export const getErrorDetail = params =>
  request({
    url: "/error/getErrorDetail",
    method: "get",
    params
  });
