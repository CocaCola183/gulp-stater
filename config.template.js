var path = require('path');
module.exports = {
  srcPath: path.join(__dirname, '/src'),
  srcCssPath: path.join(__dirname, '/src/css'),
  srcJsPath: path.join(__dirname, '/src/js'),
  srcImagePath: path.join(__dirname, '/src/image'),
  distPath: path.join(__dirname, '/dist'),
  distCssPath: path.join(__dirname, '/dist/css'),
  distJsPath: path.join(__dirname, '/dist/js'),
  distImagePath: path.join(__dirname, '/dist/image'),
  css: ['bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
  ],
  js: ['bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js'
  ],
  sourceDir: 'dist',
  remote: {
    hostname: 'example.example.com',
    username: 'example',
    destination: '/home/example/site'
  }
};