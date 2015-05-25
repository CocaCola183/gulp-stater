## gulp-stater

### introduction

`gulp` 一键完成生成静态网页，部署到服务器，打开浏览器预览的功能

### done

`cp config.template.json config.json`

使用`bower`安装前端依赖，在config.json中css数组填写所需css文件路径，在js数组填写所需js文件路径，在生成的时候机会自动拷贝到输出目录，并注入到index.html中  

配置`remote`，`gulp`时默认会自动打开`remote.hostname`  

`gulp` 的task被分开写到了task文件夹下  

重写了hbs render插件 `hbsRender`放在lib文件夹下，有两个参数，依次为dataSrc templateName  

* dataSrc hbs文件源，同gulp-hbs插件
* templateName 如果render所需的数据源是*.json文件，则render的数据为json.templateName, 如果render的数据源是*.html，那么render的数据为{templateName: data}  

这里写的比较差，会优化

`gulp`

### todo

* 优化



