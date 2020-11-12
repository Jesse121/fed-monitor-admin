import request from "@/utils/request";

export const getPagePerformanceData = params =>
  request({
    url: "/performance/getPagePerformance",
    method: "get",
    params
  });

export const getApiPerformanceData = params =>
  request({
    url: "/performance/getApiPerformance",
    method: "get",
    params
  });
