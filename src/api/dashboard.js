import request from "@/utils/request";

export const addNewProject = data =>
  request({
    url: "/dashboard/addNewProject",
    method: "post",
    data
  });

export const getHaveProject = () =>
  request({
    url: "/dashboard/haveProject",
    method: "get"
  });
