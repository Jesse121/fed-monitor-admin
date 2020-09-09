import request from "@/utils/request";

export const getUsers = (params: any) =>
  request({
    url: "/api/users",
    method: "get",
    params
  });

export const getUserInfo = (data: any) =>
  request({
    url: "/api/users/info",
    method: "post",
    data
  });

export const getUserByName = (username: string) =>
  request({
    url: `/api/users/${username}`,
    method: "get"
  });

export const updateUser = (username: string, data: any) =>
  request({
    url: `/api/users/${username}`,
    method: "put",
    data
  });

export const deleteUser = (username: string) =>
  request({
    url: `/api/users/${username}`,
    method: "delete"
  });

export const login = (data: any) =>
  request({
    url: "/api/users/login",
    method: "post",
    data
  });

export const logout = () =>
  request({
    url: "/api/users/logout",
    method: "post"
  });

export const register = (data: any) =>
  request({
    url: "/api/users/register",
    method: "post",
    data
  });
