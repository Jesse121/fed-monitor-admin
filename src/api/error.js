import request from "@/utils/request";

export const getErrorData = params =>
  request({
    url: "/getError",
    method: "get",
    params
  });
