var through = require('through2');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
var PluginError = gutil.PluginError;
var Handlebars = require('handlebars');
var templates = {};
const PLUGIN_NAME = 'gulp-hbsRender';

function hbsRender(dataSrc, attrName) {
  if (!dataSrc) {
    throw new PluginError(PLUGIN_NAME, 'Need source data!');
  }
  if (!templates[dataSrc]) {
    try {
      var templateText = fs.readFileSync(dataSrc, 'utf-8');
      templates[dataSrc] = Handlebars.compile(templateText);
    } catch (err) {
      throw new gutil.PluginError('gulp-hbs', err);
    }
  }
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
    }
    if (file.isBuffer()) {
      var sourceData = file.contents.toString();
      //get needed json
      var data = {};
      if (path.extname(file.path) == '.json') data = JSON.parse(sourceData)[
        attrName];
      else data[attrName] = sourceData;
      var result = templates[dataSrc](data);
      // rename
      var dirname = path.dirname(file.path);
      file.path = path.join(dirname, attrName + '.html');
      file.contents = new Buffer(result, 'utf-8');
    }
    if (file.isStream()) {
      return cb(new gutil.PluginError(PLUGIN_NAME,
        'Streaming not supported'));
    }
    cb(null, file);
  });
}
module.exports = hbsRender;