import request from "@/utils/request";

interface Ipagination {
  page: number;
  pageSize: number;
}

export const getPerformanceData = (params: Ipagination) =>
  request({
    url: "/api/performance/getPerformance",
    method: "get",
    params
  });
