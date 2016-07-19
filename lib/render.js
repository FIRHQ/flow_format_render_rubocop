var fs = require('fs');
var path = require('path');

var JadeRender = require('./jade_render');

function Format(date, fmt) { //author: meizz
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}


module.exports = function (options) {

  var result = {};

  if (options.rubocopResult) {
    result = options.rubocopResult;
  } else if (options.rubocopResultFile) {
    var fileContent = fs.readFileSync(options.rubocopResultFile);
    result = JSON.parse(String(fileContent));
  }
  var nowTime = new Date();
  result.nowTime = Format(nowTime, 'yyyy-MM-dd');
  result.project = options.project;
  result.event = options.event;
  result.job = options.job;

  var html = JadeRender.render(options.template, result);

  var distDir = path.join(__dirname, '../dist');
  var distFile = distDir + '/index.html';

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  fs.writeFileSync(distFile, html);
};
