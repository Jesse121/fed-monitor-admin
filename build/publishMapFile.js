const fs = require("fs");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// 读取文件
var files = fs.readdirSync(resolve("../dist/static/js"));
// 过滤文件
var mapFiles = files.filter(file => {
  return file.endsWith(".map");
});
// 移动文件
mapFiles.forEach(item => {
  const srcPath = resolve("../dist/static/js/" + item);
  const destPath = resolve(
    "../../fed-monitor-server/public/monitor-map/" + item
  );
  fs.rename(srcPath, destPath, function(err) {
    if (err) throw err;
  });
});
