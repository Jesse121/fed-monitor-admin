import request from "@/utils/request";

interface Ipagination {
  page: number;
  pageSize: number;
}

export const getErrorData = (params: Ipagination) =>
  request({
    url: "/api/getError",
    method: "get",
    params
  });
