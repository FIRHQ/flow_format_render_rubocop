var fs = require('fs');
var path = require('path');

var JadeRender = require('./jade_render');

module.exports = function (options) {

  var result = {};

  if (options.rubocopResult) {
    result = options.rubocopResult;
  } else if (options.rubocopResultFile) {
    var fileContent = fs.readFileSync(options.rubocopResultFile);
    result = JSON.parse(String(fileContent));
  }

  var html = JadeRender.render(options.template, result);

  var distDir = path.join(__dirname, '../dist');
  var distFile = distDir + '/index.html';

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  fs.writeFileSync(distFile, html);
};
