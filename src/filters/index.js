import moment from "moment";

/**
 * 将时间戳转为年月日格式
 * @param {*} timeStamp
 */
export const formatTime = timeStamp => {
  return moment(timeStamp).format("YYYY-MM-DD HH:mm:ss");
};
