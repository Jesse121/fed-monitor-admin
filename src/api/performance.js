import request from "@/utils/request";

export const getPerformanceData = params =>
  request({
    url: "/performance/getPerformance",
    method: "get",
    params
  });
